// Import module
const express = require("express");
const app = express();
require("express-async-errors");

// Static file setup
app.use(express.static( "./public"));

require('./controllers/view.controller')(app)
require('./controllers/route.controller')(app)
require('./controllers/error.controller')(app)

// App is listening at PORT 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Application is running at http://localhost:${PORT}`);
});
