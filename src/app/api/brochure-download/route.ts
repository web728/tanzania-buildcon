import { NextRequest, NextResponse } from "next/server";
import { brochureDownloadSchema } from "@/lib/validation/brochureDownload";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { BrochureDownload } from "@/models/BrochureDownload";
import { generateReferenceId } from "@/lib/utils/referenceId";
import { isRateLimited, getClientIp } from "@/lib/utils/rateLimit";
import { appendLeadRow, isSheetsConfigured } from "@/lib/google/sheets";

const BROCHURE_FILE_URL = "/downloads/Tanzania-Buildcon-Expo-Brochure-2027.pdf";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (isRateLimited(`brochure:${ip}`)) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = brochureDownloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.website_hp || (data.startedAt && Date.now() - data.startedAt < MIN_SUBMIT_MS)) {
    // Bot: pretend success but don't actually give the file URL.
    return NextResponse.json({ success: true, referenceId: generateReferenceId("BRCH") });
  }

  const referenceId = generateReferenceId("BRCH");

  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error("Database connection unavailable");

    await BrochureDownload.create({
      referenceId,
      name: data.name,
      company: data.company,
      country: data.country,
      email: data.email,
      mobile: data.mobile,
      utm: data.utm,
      landingPage: data.landingPage,
      userAgent: req.headers.get("user-agent") || undefined,
    });
  } catch (err) {
    console.error("BrochureDownload save failed:", safeDbErrorMessage(err));
    return NextResponse.json(
      { error: "We couldn't process your request right now. Please try again in a moment." },
      { status: 503 },
    );
  }

  if (isSheetsConfigured()) {
    try {
      await appendLeadRow("Brochure Downloads", {
        referenceId,
        name: data.name,
        company: data.company,
        designation: "",
        country: data.country,
        city: "",
        email: data.email,
        phone: data.mobile,
        type: "Brochure Download",
        productInterest: "",
        message: "",
        utmSource: data.utm?.source ?? "",
        utmMedium: data.utm?.medium ?? "",
        utmCampaign: data.utm?.campaign ?? "",
        landingPage: data.landingPage ?? "",
      });
      await BrochureDownload.updateOne({ referenceId }, { sheetsSyncStatus: "synced" });
    } catch (err) {
      console.error("Sheets sync failed", err);
      await BrochureDownload.updateOne({ referenceId }, { sheetsSyncStatus: "failed" }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true, referenceId, fileUrl: BROCHURE_FILE_URL });
}