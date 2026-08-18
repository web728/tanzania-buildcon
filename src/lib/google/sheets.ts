import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
// Service-account private keys are stored in env as a single line with
// literal "\n" sequences — they must be converted back to real newlines.
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

export const SHEET_COLUMNS = [
  "Reference ID",
  "Date",
  "Time",
  "Name",
  "Company",
  "Designation",
  "Country",
  "City",
  "Email",
  "Phone",
  "Type",
  "Product Interest",
  "Message",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "Landing Page",
  "Status",
] as const;

export type SheetRow = {
  referenceId: string;
  name: string;
  company: string;
  designation: string;
  country: string;
  city: string;
  email: string;
  phone: string;
  type: string;
  productInterest: string;
  message: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  landingPage: string;
};

function isConfigured(): boolean {
  return Boolean(SHEET_ID && CLIENT_EMAIL && PRIVATE_KEY);
}

function toRowValues(row: SheetRow): string[] {
  const now = new Date();
  return [
    row.referenceId,
    now.toISOString().slice(0, 10),
    now.toISOString().slice(11, 19),
    row.name,
    row.company,
    row.designation,
    row.country,
    row.city,
    row.email,
    row.phone,
    row.type,
    row.productInterest,
    row.message,
    row.utmSource,
    row.utmMedium,
    row.utmCampaign,
    row.landingPage,
    "New",
  ];
}

/**
 * Appends a lead row to the given tab of the operational Google Sheet.
 * No-ops when Google credentials are not configured (local/dev). Throws on
 * failure so callers can mark the lead's sync status accordingly — this
 * function never touches MongoDB, which remains the source of truth.
 */
export async function appendLeadRow(tab: string, row: SheetRow): Promise<void> {
  if (!isConfigured()) return;

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: CLIENT_EMAIL, private_key: PRIVATE_KEY },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A:R`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [toRowValues(row)] },
  });
}

export function isSheetsConfigured(): boolean {
  return isConfigured();
}
