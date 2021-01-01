const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>THIS IS ADMIN PAGE</h1>");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`The admin page is running at port ${PORT}`);
});
