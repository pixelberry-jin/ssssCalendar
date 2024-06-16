import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
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

  const year = req.query.year;
  if (!year || typeof year !== "string") {
    return res
      .status(400)
      .json({ error: "Month is required and must be a string" });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.NEXT_PUBlIC_GOOGLE_CLIENT_ID,
    process.env.NEXT_PUBlIC_GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    access_token: accessToken.replace("Bearer ", ""),
  });

  try {
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    // const timeMin = new Date(`${year}-${month}-01`).toISOString(); // 월의 시작
    // const timeMax = new Date(
    //   `${month === "12" ? year + 1 : year}-${
    //     parseInt(month === "12" ? "01" : month) + 1
    //   }-01`
    // ).toISOString(); // 다음 달의 시작

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date(`${year}-01-01`).toISOString(),
      timeMax: new Date(`${year + 1}-01-01`).toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const schedules = response.data.items?.map((item, idx) => {
      const fullDate =
        item.start?.date ?? String(item.start?.dateTime).substring(0, 10);
      return {
        id: fullDate,
        order: idx,
        year: fullDate.substring(0, 4),
        month: fullDate.substring(5, 7),
        day: fullDate.substring(8, 10),
        name: item.summary,
      };
    });

    return res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching calendar events", error);
    return res.status(500).json({ error: "Error fetching calendar events" });
  }
}
