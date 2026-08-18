import { NextRequest, NextResponse } from "next/server";
import { visitorRegistrationSchema } from "@/lib/validation/visitorRegistration";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { VisitorRegistration } from "@/models/VisitorRegistration";
import { generateReferenceId } from "@/lib/utils/referenceId";
import { isRateLimited, getClientIp } from "@/lib/utils/rateLimit";
import { appendLeadRow, isSheetsConfigured } from "@/lib/google/sheets";
import { sendVisitorRegistrationEmails } from "@/lib/email/sendLeadEmails";
import { isEmailConfigured } from "@/lib/email/mailer";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (isRateLimited(`visitor:${ip}`)) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = visitorRegistrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.website_hp || (data.startedAt && Date.now() - data.startedAt < MIN_SUBMIT_MS)) {
    return NextResponse.json({ success: true, referenceId: generateReferenceId("TBVR") });
  }

  const referenceId = generateReferenceId("TBVR");

  // MongoDB is the source of truth: a submission is only "accepted" once it
  // is durably saved. A missing/unreachable database must never be silently
  // treated as success.
  let alreadyRegisteredId: string | null = null;
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error("Database connection unavailable");

    const existing = await VisitorRegistration.findOne({ email: data.email }).lean();
    if (existing) {
      alreadyRegisteredId = (existing as { referenceId: string }).referenceId;
    } else {
      await VisitorRegistration.create({
        referenceId,
        firstName: data.firstName,
        lastName: data.lastName,
        designation: data.designation,
        company: data.company,
        country: data.country,
        city: data.city,
        email: data.email,
        mobile: data.mobile,
        natureOfBusiness: data.natureOfBusiness,
        productsInterested: data.productsInterested,
        purchasingResponsibility: data.purchasingResponsibility,
        purposeOfVisit: data.purposeOfVisit,
        utm: data.utm,
        landingPage: data.landingPage,
        userAgent: req.headers.get("user-agent") || undefined,
      });
    }
  } catch (err) {
    console.error("VisitorRegistration save failed:", safeDbErrorMessage(err));
    return NextResponse.json(
      { error: "We couldn't save your registration right now. Please try again in a moment." },
      { status: 503 },
    );
  }

  if (alreadyRegisteredId) {
    return NextResponse.json({ success: true, referenceId: alreadyRegisteredId, alreadyRegistered: true });
  }

  // MongoDB save has already succeeded at this point — Sheets/email are
  // secondary and must never cause the (already-accepted) request to fail.
  if (isSheetsConfigured()) {
    try {
      await appendLeadRow("Visitor Registrations", {
        referenceId,
        name: `${data.firstName} ${data.lastName}`,
        company: data.company,
        designation: data.designation,
        country: data.country,
        city: data.city,
        email: data.email,
        phone: data.mobile,
        type: data.natureOfBusiness,
        productInterest: data.productsInterested.join(", "),
        message: data.purposeOfVisit,
        utmSource: data.utm?.source ?? "",
        utmMedium: data.utm?.medium ?? "",
        utmCampaign: data.utm?.campaign ?? "",
        landingPage: data.landingPage ?? "",
      });
      await VisitorRegistration.updateOne({ referenceId }, { sheetsSyncStatus: "synced" });
    } catch (err) {
      console.error("Sheets sync failed", err);
      await VisitorRegistration.updateOne({ referenceId }, { sheetsSyncStatus: "failed" }).catch(() => {});
    }
  }

  if (isEmailConfigured()) {
    try {
      await sendVisitorRegistrationEmails({ ...data, referenceId });
      await VisitorRegistration.updateOne({ referenceId }, { emailStatus: "sent" });
    } catch (err) {
      console.error("Visitor registration email failed", err);
      await VisitorRegistration.updateOne({ referenceId }, { emailStatus: "failed" }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true, referenceId });
}
