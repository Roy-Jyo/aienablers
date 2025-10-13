"use server";

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function actionSendDemo(formData: FormData) {
  const tenantId = process.env.M365_TENANT_ID!;
  const clientId = process.env.M365_CLIENT_ID!;
  const clientSecret = process.env.M365_CLIENT_SECRET!;
  const fromUpn = process.env.M365_MAILBOX_UPN!;
  const toEmail = process.env.DEMO_REQUEST_TO!;
  const siteName = process.env.SITE_NAME || "Recruitment as a Service";

  const payload = {
    company: String(formData.get("company") || ""),
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    roles: String(formData.get("roles") || ""),
    notes: String(formData.get("notes") || ""),
  };

  // Get Graph token
  const tokenRes = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
    cache: "no-store",
  });

  if (!tokenRes.ok) throw new Error(await tokenRes.text());
  const { access_token } = await tokenRes.json();

  // Send email via Graph
  const subject = `[${siteName}] Demo request from ${payload.company || payload.name || "Website"}`;
  const bodyHtml = `
    <h2>${subject}</h2>
    <p><b>Name:</b> ${escapeHtml(payload.name)}<br>
       <b>Email:</b> ${escapeHtml(payload.email)}<br>
       <b>Company:</b> ${escapeHtml(payload.company)}<br>
       <b>Phone:</b> ${escapeHtml(payload.phone)}<br>
       <b>Roles:</b> ${escapeHtml(payload.roles)}<br>
       <b>Notes:</b> ${escapeHtml(payload.notes)}</p>
  `;

  const sendRes = await fetch(`https://graph.microsoft.com/v1.0/users/${fromUpn}/sendMail`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        subject,
        body: { contentType: "HTML", content: bodyHtml },
        toRecipients: [{ emailAddress: { address: toEmail } }],
        replyTo: payload.email ? [{ emailAddress: { address: payload.email } }] : [],
      },
      saveToSentItems: true,
    }),
  });

  if (!sendRes.ok) throw new Error(await sendRes.text());
  return { ok: true };
}
