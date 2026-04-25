const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Bookmark rounter home page");
});

module.exports = router;
