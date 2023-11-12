import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send("Code not provided");
  }
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URL
    );

    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    const people = google.people({
      version: "v1",
      auth: oauth2Client,
    });

    const userInfo = await people.people.get({
      resourceName: "people/me",
      personFields: "emailAddresses,names,photos",
    });

    const maxAge = (tokens.expiry_date ?? 0 - Date.now()) / 1000;
    res.setHeader("Set-Cookie", [
      `access_token=${tokens.token_type} ${tokens.access_token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax;`,
    ]);

    // 프로덕션
    // res.setHeader("Set-Cookie", [
    //   `access_token=${tokens.token_type} ${tokens.access_token}; HttpOnly; Secure; Path=/; Domain=${process.env.NEXT_PUBLIC_DOMAIN}; Max-Age=${maxAge}; SameSite=Strict;`,
    // ]);

    res.redirect(
      `/auth-success?userInfo=${encodeURIComponent(
        JSON.stringify(userInfo.data)
      )}&loginType=google`
    );
  } catch (error) {
    console.error("!! error", error);
    res.status(500).json({ message: "Authentication failed" });
  }
}
