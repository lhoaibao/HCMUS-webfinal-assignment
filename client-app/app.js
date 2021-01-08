// Import module
const express = require("express");
const path = require("path");
const app = express();
require("express-async-errors");

// Static file setup
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

require("./middlewares/view.mdw")(app);
require("./middlewares/session.mdw")(app);
require("./middlewares/locals.mdw")(app);
require("./middlewares/routes.mdw")(app);
require("./middlewares/error.mdw")(app);

// App is listening at PORT 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Application is running at http://localhost:${PORT}`);
});
