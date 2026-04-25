const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Authentication home page");
});

module.exports = router;