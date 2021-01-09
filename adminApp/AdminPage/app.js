const express = require("express");
const path = require('path');
require("express-async-errors");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Static file setup
app.use(express.static(path.join(__dirname, 'public')));

require("./controllers/view.controller")(app);
require("./controllers/session.controller")(app);
require("./controllers/local.controller")(app);
require("./controllers/routes.controller")(app);

const PORT = 3001;
app.listen(PORT, function () {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
