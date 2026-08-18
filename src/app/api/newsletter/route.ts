import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { NewsletterSubscriber } from "@/models/NewsletterSubscriber";
import { appendLeadRow, isSheetsConfigured } from "@/lib/google/sheets";

const NewsletterSchema = z.object({
  email: z.string().trim().email().max(200),
  website: z.string().max(0).optional(), // honeypot — must stay empty
  startedAt: z.number().optional(),
  country: z.string().max(100).optional(),
  interest: z.array(z.string().max(50)).max(5).optional(),
});

const MIN_SUBMIT_MS = 1200;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = NewsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const { email, website, startedAt, country, interest } = parsed.data;

  // Honeypot: bots fill hidden fields.
  if (website) {
    return NextResponse.json({ success: true });
  }

  // Reject submissions completed implausibly fast (bot behaviour).
  if (startedAt && Date.now() - startedAt < MIN_SUBMIT_MS) {
    return NextResponse.json({ success: true });
  }

  const normalizedEmail = email.toLowerCase();

  // MongoDB is the source of truth: a submission is only "accepted" once it
  // is durably saved. A missing/unreachable database must never be silently
  // treated as success.
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error("Database connection unavailable");

    await NewsletterSubscriber.updateOne(
      { email: normalizedEmail },
      { $set: { email: normalizedEmail, country, interest } },
      { upsert: true },
    );
  } catch (err) {
    console.error("NewsletterSubscriber save failed:", safeDbErrorMessage(err));
    return NextResponse.json(
      { error: "We couldn't process your subscription right now. Please try again in a moment." },
      { status: 503 },
    );
  }

  // MongoDB save has already succeeded at this point — Sheets sync is
  // secondary and must never cause the (already-accepted) request to fail.
  // Skipped entirely (status stays "pending") when Sheets isn't configured,
  // rather than marking a no-op as "synced".
  if (isSheetsConfigured()) {
    try {
      await appendLeadRow("Newsletter", {
        referenceId: "",
        name: "",
        company: "",
        designation: "",
        country: country ?? "",
        city: "",
        email: normalizedEmail,
        phone: "",
        type: "Newsletter Signup",
        productInterest: (interest ?? []).join(", "),
        message: "",
        utmSource: "",
        utmMedium: "",
        utmCampaign: "",
        landingPage: "",
      });
      await NewsletterSubscriber.updateOne({ email: normalizedEmail }, { sheetsSyncStatus: "synced" });
    } catch (err) {
      console.error("Newsletter Sheets sync failed", err);
      await NewsletterSubscriber.updateOne({ email: normalizedEmail }, { sheetsSyncStatus: "failed" }).catch(
        () => {},
      );
    }
  }

  return NextResponse.json({ success: true });
}
