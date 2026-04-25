const express = require("express");
const app = express();
const router = require("./router/api");
const port = 3000;

app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
