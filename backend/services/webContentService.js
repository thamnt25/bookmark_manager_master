const cheerio = require("cheerio");

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
const MAX_CONTENT_LENGTH = 3000;
const MAX_BODY_TEXT_LENGTH = 3000;
const MAX_HEADINGS = 10;

async function fetchHtml(url) {
  const targetUrl = new URL(url);
  const response = await fetch(targetUrl.href, {
    headers: {
      "User-Agent": USER_AGENT,
    },
  });

  if (!response.ok) {
    const error = new Error(`Could not fetch URL. Status: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.text();
}

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

  const title = extractWebTitle(html);
  const metaDescription =
    cleanText($('meta[name="description"]').attr("content") || "") ||
    cleanText($('meta[property="og:description"]').attr("content") || "");

  const headings = $("h2, h3")
    .map((_, el) => cleanText($(el).text()))
    .get()
    .filter(Boolean)
    .slice(0, MAX_HEADINGS);

  const paragraphs = $("main p, article p, p")
    .map((_, el) => cleanText($(el).text()))
    .get()
    .filter((text) => text.length > 20);

  const bodyText = cleanText($("main, article, body").first().text()).slice(
    0,
    MAX_BODY_TEXT_LENGTH,
  );

  return {
    title,
    headings,
    content: [metaDescription, paragraphs.join(" "), bodyText]
      .filter(Boolean)
      .join(" ")
      .slice(0, MAX_CONTENT_LENGTH),
  };
}

function cleanText(text) {
  return text.replace(/\s+/g, " ").trim();
}

module.exports = {
  fetchHtml,
  extractWebContent,
  extractWebTitle,
};
