const hbs = require('express-handlebars');

module.exports = function (app) {
  app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    extname: 'hbs',
    layoutsDir: 'views/layouts',
    partialsDir: 'views/partials',
  }));
  app.set('view engine', 'hbs');
}