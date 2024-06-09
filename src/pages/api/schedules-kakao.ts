import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.access_token;

  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // 카카오 톡 캘린더 API 호출
    const response = await axios.get(
      "https://kapi.kakao.com/v2/api/calendar/events",
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );

    const calendars = response.data; // 응답 데이터

    return res.status(200).json(calendars);
  } catch (error) {
    console.error("Error fetching Kakao Talk calendar events", error);
    return res
      .status(500)
      .json({ error: "Error fetching Kakao Talk calendar events" });
  }
}
