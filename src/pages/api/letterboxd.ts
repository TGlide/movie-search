import * as cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";
import { Movie } from "../../entities/Movie";

const slugRegex = /\/film\/(.*?)\//;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return;
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: "No URL specified" });

  let listPage = 1;
  const movies: Movie[] = [];

  try {
    while (true) {
      const letterboxdRes = await fetch(`${url}/page/${listPage}`);
      const html = await letterboxdRes.text();
      const $ = cheerio.load(html);

      const posters = $(".film-poster");
      if (posters.length === 0) break;

      posters.each((_, el) => {
        const slug = el.attribs["data-film-slug"];
        if (!slug) return;

        const match = slug.match(slugRegex);

        if (!match || match.length == 1) {
          movies.push({ title: slug });
        } else {
          const title = match![1].split("-").join(" ");
          movies.push({ title });
        }
      });

      listPage++;
    }
  } catch (e) {
    console.error(e);
    return res
      .status(400)
      .json({ error: "Couldn't fetch movies from the list" });
  }

  res.status(200).json({ movies: movies });
}
