import { NextResponse } from "next/server";
import { Client } from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch";

async function getAccessToken() {
  const tenantId = process.env.M365_TENANT_ID!;
  const clientId = process.env.M365_CLIENT_ID!;
  const clientSecret = process.env.M365_CLIENT_SECRET!;

  const tokenResponse = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        scope: "https://graph.microsoft.com/.default",
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }),
    }
  );

  const data = await tokenResponse.json();
  if (!data.access_token) throw new Error("Failed to get Graph token");
  return data.access_token;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const accessToken = await getAccessToken();
    const client = Client.init({
      authProvider: (done) => done(null, accessToken),
    });

    const fileName = `${Date.now()}_${file.name}`;
    const uploadPath = `/drive/root:/RecruitAI_CVs/${fileName}:/content`;

    await client.api(uploadPath).put(buffer);

    return NextResponse.json({
      message: "File uploaded successfully",
      fileName,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
