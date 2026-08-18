import { NextRequest, NextResponse } from "next/server";
import { exhibitorEnquirySchema } from "@/lib/validation/exhibitorEnquiry";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { ExhibitorEnquiry } from "@/models/ExhibitorEnquiry";
import { generateReferenceId } from "@/lib/utils/referenceId";
import { isRateLimited, getClientIp } from "@/lib/utils/rateLimit";
import { appendLeadRow, isSheetsConfigured } from "@/lib/google/sheets";
import { sendExhibitorEnquiryEmails } from "@/lib/email/sendLeadEmails";
import { isEmailConfigured } from "@/lib/email/mailer";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (isRateLimited(`exhibitor:${ip}`)) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = exhibitorEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot + minimum-time bot checks — silently accept without persisting.
  if (data.website_hp || (data.startedAt && Date.now() - data.startedAt < MIN_SUBMIT_MS)) {
    return NextResponse.json({ success: true, referenceId: generateReferenceId("TBEX") });
  }

  const referenceId = generateReferenceId("TBEX");

  // MongoDB is the source of truth: a submission is only "accepted" once it
  // is durably saved. A missing/unreachable database must never be silently
  // treated as success — that would tell a visitor their enquiry was
  // received when nothing was persisted anywhere.
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error("Database connection unavailable");

    await ExhibitorEnquiry.create({
      referenceId,
      companyName: data.companyName,
      country: data.country,
      city: data.city,
      website: data.website || undefined,
      companyType: data.companyType,
      firstName: data.firstName,
      lastName: data.lastName,
      designation: data.designation,
      email: data.email,
      mobile: data.mobile,
      productCategory: data.productCategory,
      productsServices: data.productsServices,
      preferredParticipation: data.preferredParticipation,
      requiredArea: data.requiredArea,
      existingBusinessInTanzania: data.existingBusinessInTanzania || undefined,
      lookingForDistributor: data.lookingForDistributor || undefined,
      message: data.message,
      utm: data.utm,
      landingPage: data.landingPage,
      userAgent: req.headers.get("user-agent") || undefined,
    });
  } catch (err) {
    console.error("ExhibitorEnquiry save failed:", safeDbErrorMessage(err));
    return NextResponse.json(
      { error: "We couldn't save your enquiry right now. Please try again in a moment." },
      { status: 503 },
    );
  }

  // MongoDB save has already succeeded at this point — Sheets/email are
  // secondary and must never cause the (already-accepted) request to fail.
  // Await them (rather than fire-and-forget) since serverless functions may
  // be frozen once a response ships. Skip entirely (leaving status
  // "pending") when not configured, rather than marking a no-op as
  // "synced"/"sent".
  if (isSheetsConfigured()) {
    try {
      await appendLeadRow("Exhibitor Enquiries", {
        referenceId,
        name: `${data.firstName} ${data.lastName}`,
        company: data.companyName,
        designation: data.designation,
        country: data.country,
        city: data.city ?? "",
        email: data.email,
        phone: data.mobile,
        type: data.companyType,
        productInterest: data.productCategory,
        message: data.productsServices,
        utmSource: data.utm?.source ?? "",
        utmMedium: data.utm?.medium ?? "",
        utmCampaign: data.utm?.campaign ?? "",
        landingPage: data.landingPage ?? "",
      });
      await ExhibitorEnquiry.updateOne({ referenceId }, { sheetsSyncStatus: "synced" });
    } catch (err) {
      console.error("Sheets sync failed", err);
      await ExhibitorEnquiry.updateOne({ referenceId }, { sheetsSyncStatus: "failed" }).catch(() => {});
    }
  }

  if (isEmailConfigured()) {
    try {
      await sendExhibitorEnquiryEmails({ ...data, referenceId });
      await ExhibitorEnquiry.updateOne({ referenceId }, { emailStatus: "sent" });
    } catch (err) {
      console.error("Exhibitor enquiry email failed", err);
      await ExhibitorEnquiry.updateOne({ referenceId }, { emailStatus: "failed" }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true, referenceId });
}
