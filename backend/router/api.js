const express = require("express");
const apiRouter = express.Router();
const bookmarkRouter = require("./bookmarkRouter");
const authenticationRouter = require("./authentication");

apiRouter.use("/profile", authenticationRouter);

apiRouter.use("/bookmark", bookmarkRouter);

module.exports = apiRouter;
