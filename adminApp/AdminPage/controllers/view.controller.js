const hbs = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const numeral = require('numeral');
const Blob = require("cross-blob");
const FileReader = require('filereader')
const moment = require('moment');

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
    if (inputData) {
      return "data:image/png;base64, " + Buffer.from(inputData).toString('base64')
    }
    return "/img/dummy/u1.png"
  });

  temp.handlebars.registerHelper('date', function (inputData) {
    return moment(inputData).format('YYYY-MM-DD')
  });

  temp.handlebars.registerHelper("select", function (value, options) {
    return options.fn(this)
      .split('\n')
      .map(function (v) {
        var t = 'value="' + value + '"'
        return !RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
      })
      .join('\n')
  });

  temp.handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });

  temp.handlebars.registerHelper('ifNotEquals', function (arg1, arg2, options) {
    return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
  });
}