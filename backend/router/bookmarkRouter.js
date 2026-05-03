const express = require("express");
const router = express.Router();
const { getAllBookMarks } = require("../firebase/bookMark");
const { recommendMetaData } = require("../services/bookmarkAiService");
const {
  extractWebContent,
  fetchHtml,
} = require("../services/webContentService");

router.get("/", async (req, res, next) => {
  try {
    const bookMarks = await getAllBookMarks();
    res.status(200).json(bookMarks);
  } catch (e) {
    next(e);
  }
});

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

module.exports = router;
