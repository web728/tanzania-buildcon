import { event } from "@/config/event";

function baseLayout(bodyHtml: string): string {
  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#F4F8FA;font-family:Arial,Helvetica,sans-serif;color:#0B1720;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F8FA;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #DCE5E9;">
            <tr>
              <td style="background:#0B1720;padding:24px 32px;">
                <span style="color:#02A3DC;font-weight:800;font-size:18px;">Tanzania</span>
                <span style="color:#ffffff;font-weight:800;font-size:18px;"> Buildcon</span>
                <div style="color:rgba(255,255,255,0.6);font-size:12px;margin-top:4px;letter-spacing:0.05em;text-transform:uppercase;">
                  International Expo ${event.edition}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background:#F4F8FA;padding:20px 32px;font-size:12px;color:#4A5962;">
                ${event.name}<br />
                ${event.dates.display} · ${event.venue.fullLocation}<br />
                ${event.websiteDisplay}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailRow(label: string, value?: string | null): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 0;font-size:13px;color:#4A5962;width:160px;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;font-size:13px;color:#0B1720;font-weight:600;">${value}</td>
  </tr>`;
}

export function organiserNotificationEmail(params: {
  heading: string;
  referenceId: string;
  rows: Array<{ label: string; value?: string | null }>;
}): string {
  const body = `
    <h1 style="font-size:18px;margin:0 0 4px;">${params.heading}</h1>
    <p style="font-size:13px;color:#4A5962;margin:0 0 20px;">Reference: <strong>${params.referenceId}</strong></p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${params.rows.map((r) => detailRow(r.label, r.value)).join("")}
    </table>
  `;
  return baseLayout(body);
}

export function userAcknowledgementEmail(params: {
  greetingName: string;
  heading: string;
  bodyText: string;
  referenceId: string;
}): string {
  const body = `
    <h1 style="font-size:18px;margin:0 0 12px;">${params.heading}</h1>
    <p style="font-size:14px;line-height:1.6;color:#0B1720;margin:0 0 16px;">Dear ${params.greetingName},</p>
    <p style="font-size:14px;line-height:1.6;color:#0B1720;margin:0 0 16px;">${params.bodyText}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="background:#F4F8FA;border-radius:8px;padding:16px;margin:0 0 16px;">
      <tr><td style="padding:12px 16px;font-size:13px;color:#4A5962;">Your Reference ID</td></tr>
      <tr><td style="padding:0 16px 12px;font-size:20px;font-weight:800;color:#02A3DC;">${params.referenceId}</td></tr>
    </table>
    <p style="font-size:13px;line-height:1.6;color:#4A5962;margin:0;">
      This email confirms receipt of your submission only. Our team will be in touch directly
      regarding next steps.
    </p>
  `;
  return baseLayout(body);
}
