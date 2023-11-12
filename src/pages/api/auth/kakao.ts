import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = typeof req.query.code === "string" ? req.query.code : "";

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      new URLSearchParams({
        code: code,
        client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "", // 환경 변수가 없는 경우를 대비한 기본값
        redirect_uri: "http://localhost:3000/api/auth/kakao",
        grant_type: "authorization_code",
      }).toString(),
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    const { access_token, expires_in } = await tokenResponse.data;
    const userInfoResponse = await axios.get(
      "https://kapi.kakao.com/v2/user/me",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userInfo = userInfoResponse.data;

    const maxAge = (expires_in ?? 0 - Date.now()) / 1000;
    res.setHeader("Set-Cookie", [
      `access_token=Bearer ${access_token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax;`,
    ]);

    // 프로덕션
    // res.setHeader("Set-Cookie", [
    //   `access_token=Bearer ${access_token}; HttpOnly; Secure; Path=/; Domain=${process.env.NEXT_PUBLIC_DOMAIN}; Max-Age=${maxAge}; SameSite=Strict;`,
    // ]);

    res.redirect(
      `/auth-success?userInfo=${encodeURIComponent(
        JSON.stringify(userInfo)
      )}&loginType=kakao`
    );
  } catch (error) {
    console.error("Kakao login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
