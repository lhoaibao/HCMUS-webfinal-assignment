let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

/////////////
// OPTIONS //
/////////////

const sassOptions = {
  sassOptions: {
    includePaths: ['node_modules']
  },
  implementation: require('sass')
}

mix
  .setPublicPath('public')
  .options({
    processCssUrls: false,
    postCss: [
      require('postcss-rtl')
    ]
  })

////////////////////////////////////////////
// Browser Support: see .babelrc          //
// Enable Babel for node_modules packages //
////////////////////////////////////////////

mix.webpackConfig({
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules\/(core-js|@babel\b)|bower_components)/,
      use: [
        {
          loader: 'babel-loader',
          options: Config.babel()
        }
      ]
    }]
  }
})

/////////////
// SCRIPTS //
/////////////

mix
  .js('resources/js/accordion.js', 'public/js')
  .js('resources/js/app-icons.js', 'public/js')
  .js('resources/js/app.js', 'public/js')
  .js('resources/js/check-selected-row.js', 'public/js')
  .js('resources/js/collapse-resize.js', 'public/js')
  .js('resources/js/hljs.js', 'public/js')
  .js('resources/js/image.js', 'public/js')
  .js('resources/js/main.js', 'public/js')
  .js('resources/js/mdk-carousel-control.js', 'public/js')
  .js('resources/js/messages.js', 'public/js')
  .js('resources/js/page.analytics-2-dashboard.js', 'public/js')
  .js('resources/js/page.analytics-dashboard.js', 'public/js')
  .js('resources/js/page.crm-dashboard.js', 'public/js')
  .js('resources/js/page.ecommerce.js', 'public/js')
  .js('resources/js/page.employees.js', 'public/js')
  .js('resources/js/page.erp-dashboard.js', 'public/js')
  .js('resources/js/page.hr-dashboard.js', 'public/js')
  .js('resources/js/page.instructor-dashboard.js', 'public/js')
  .js('resources/js/page.instructor-earnings.js', 'public/js')
  .js('resources/js/page.projects.js', 'public/js')
  .js('resources/js/page.staff.js', 'public/js')
  .js('resources/js/page.student-dashboard.js', 'public/js')
  .js('resources/js/page.student-profile.js', 'public/js')
  .js('resources/js/page.tasks-board.js', 'public/js')
  .js('resources/js/page.ui-charts.js', 'public/js')
  .js('resources/js/perfect-scrollbar.js', 'public/js')
  .js('resources/js/player.js', 'public/js')
  .js('resources/js/preloader.js', 'public/js')
  .js('resources/js/settings.js', 'public/js')
  .js('resources/js/sidebar-mini.js', 'public/js')
  .js('resources/js/sidebar.js', 'public/js')
  .js('resources/js/theme-utils.js', 'public/js')
  .js('resources/js/toggle-check-all.js', 'public/js')

////////////
// STYLES //
////////////

mix
  .sass('resources/scss/app.scss', 'public/css', sassOptions)
  .sass('resources/scss/dark.scss', 'public/css', sassOptions)
  .sass('resources/scss/preloader.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/bootstrap-datepicker.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/bootstrap-timepicker.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/bootstrap-touchspin.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/dropzone.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/fancytree.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/flatpickr-airbnb.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/flatpickr.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/fontawesome.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/fullcalendar.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/ion-rangeslider.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/jvectormap.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/material-icons.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/nestable.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/quill.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/select2.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/sweetalert.scss', 'public/css', sassOptions)
  .sass('resources/scss/vendor/toastr.scss', 'public/css', sassOptions)

//////////////
// Full API //
//////////////

// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.when(condition, function (mix) {}) <-- Call function if condition is true.
// mix.override(function (webpackConfig) {}) <-- Will be triggered once the webpack config object has been fully generated by Mix.
// mix.dump(); <-- Dump the generated webpack config object to the console.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   terser: {}, // Terser-specific options. https://github.com/webpack-contrib/terser-webpack-plugin#options
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
