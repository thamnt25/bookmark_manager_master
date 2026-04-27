const express = require("express");
const router = express.Router();
const { getAllBookMarks } = require("../firebase/bookMark");

router.get("/", async (req, res, next) => {
  try {
    const bookMarks = await getAllBookMarks();
    res.status(200).json(bookMarks);
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
