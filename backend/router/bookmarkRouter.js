const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const { getAllBookMarks } = require("../firebase/bookMark");

router.get("/", async (req, res, next) => {
  try {
    const bookMarks = await getAllBookMarks();
    res.status(200).json(bookMarks);
  } catch (e) {
    console.error(e);
  }
});

async function recommendMetaData(content) {
  const prompt = `You are a bookmark assistant.

    Based on this website content, return:
    1. A clear short title
    2. A short description under 160 characters
    3. Exactly 3 useful tags

    Webpage title:
    ${content.title}

    Headings:
    ${content.headings.join(", ")}

    Content:
    ${content.content}`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.AI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseJsonSchema: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              tags: {
                type: "array",
                items: { type: "string" },
              },
            },
            required: ["title", "description", "tags"],
          },
        },
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;

  return JSON.parse(text);
}

router.post("/suggest", async (req, res, next) => {
  try {
    const { url } = req?.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const html = await fetchHtml(url);
    const contentAttract = extractWebContent(html);
    const recommendation = await recommendMetaData(contentAttract);

    res.status(200).json(recommendation);
  } catch (e) {
    if (e instanceof TypeError) {
      return res.status(400).json({ error: "Invalid URL" });
    }
    next(e);
  }
});

function extractWebTitle(html) {
  const $ = cheerio.load(html);

  return (
    cleanText($('meta[property="og:title"]').attr("content") || "") ||
    cleanText($('meta[name="twitter:title"]').attr("content") || "") ||
    cleanText($("title").first().text()) ||
    cleanText($("h1").first().text())
  );
}

function extractWebContent(html) {
  const $ = cheerio.load(html);

  $("script, style, nav, footer, header, aside, iframe").remove();

  const title = $("h1").first().text().trim() || $("title").text().trim();

  const headings = $("h2, h3")
    .map((_, el) => cleanText($(el).text()))
    .get()
    .filter(Boolean);

  const paragraphs = $("p")
    .map((_, el) => cleanText($(el).text()))
    .get()
    .filter((text) => text.length > 60);

  return {
    title,
    headings,
    content: paragraphs.join(" ").slice(0, 8000),
  };
}

function cleanText(text) {
  return text.replace(/\s+/g, " ").trim();
}

module.exports = router;
