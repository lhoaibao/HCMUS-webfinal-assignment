const express = require('express');
require('express-async-errors');

const app = express();

app.use(express.urlencoded({
  extended: true
}));
// app.use('/public', express.static('public'));

require('./controllers/view.controller')(app);
require('./controllers/routes.controller')(app);

const PORT = 3001;
app.listen(PORT, function () {
  console.log(`Example app listening at http://localhost:${PORT}`);
});