import { NextApiRequest, NextApiResponse } from "next";
import { JustWatchResponse } from "../../entities/JustWatchResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(404).send("Not found.");

  const { title, locale } = req.query;
  if (!title || !locale) return res.status(400).json({ error: "Missing args" });

  const body = {
    page_size: 5,
    page: 1,
    query: title,
    content_types: ["show", "movie"],
  };

  try {
    const jwRes = await fetch(
      `https://apis.justwatch.com/content/titles/${locale}/popular?language=en&body=${JSON.stringify(
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
    const rating = movie.scoring.filter(
      (score) => score.provider_type === "imdb:score"
    )[0]?.value;
    return res.status(200).json({ onNetflix, poster, rating });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: "Couldn't fetch netflix status" });
  }
}
