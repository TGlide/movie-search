import { NextApiRequest, NextApiResponse } from "next";
import { JustWatchResponse } from "../../entities/JustWatchResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(404).send("Not found.");

  const { title } = req.query;
  if (!title) return res.status(400).json({ error: "Missing title" });

  const body = {
    page_size: 5,
    page: 1,
    query: title,
    content_types: ["show", "movie"],
  };

  try {
    const jwRes = await fetch(
      `https://apis.justwatch.com/content/titles/pt_PT/popular?language=en&body=${JSON.stringify(
        body
      )}`
    );
    const data: JustWatchResponse = await jwRes.json();

    const movie = data.items[0];
    const onNetflix = !!movie.offers?.filter((item) =>
      item.urls.standard_web.includes("netflix")
    ).length;
    const poster = movie
      ? `https://images.justwatch.com${movie.poster.replace(
          "{profile}",
          "s332"
        )}`
      : undefined;
    return res.status(200).json({ onNetflix, poster });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: "Couldn't fetch netflix status" });
  }
}
