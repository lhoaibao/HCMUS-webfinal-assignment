const hbs = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const numeral = require('numeral');
const Blob = require("cross-blob");
const FileReader = require('filereader')

module.exports = function (app) {
  app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    layoutsDir: 'views/layouts',
    partialsDir: 'views/partials',
    helpers: {
      section: hbs_sections(),
      format(val) {
        return numeral(val).format('0,0');
      }
    }
  }));
  app.set('view engine', 'hbs');
  var temp = hbs.create({});
  temp.handlebars.registerHelper('encodeMyString', function (inputData) {
    return inputData.toString('base64')
  });
}