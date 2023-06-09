var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var csscomb      = require('gulp-csscomb');
var cssnano      = require('gulp-cssnano');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var rename       = require('gulp-rename');
var sass = require('gulp-sass')(require('sass'));
var sourcemaps   = require('gulp-sourcemaps');
var merge = require('merge-stream');

var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};

var plumberOptions = {
  errorHandler: onError,
};

var postCSSOptions = require('./config.postcss.json');
var autoprefixerOptions = postCSSOptions.autoprefixer;

gulp.task('sass', function() {
  return gulp.src('_sass/screen.scss')
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('css'));
});

const hamburgerTypes = require('./config/hamburger_types.json');

gulp.task('dist:css', function() {
  const types = hamburgerTypes.map(function(type) {
    return type.name;
  });

  let bundleTypesImport = '';
  var streams = types.map(function(type) {
    const singleTypeImport = '@import "types/' + type + '";';
    bundleTypesImport += singleTypeImport;

    return gulp.src('_sass/hamburgers/hamburgers.scss')
      .pipe(sass({
        data: singleTypeImport
      }))
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(gulp.dest('dist'))
      .pipe(csscomb('.csscomb.dist.json'))
      .pipe(cssnano())
      .pipe(rename('hamburgers-' + type + '.min.css'))
      .pipe(gulp.dest('dist'));
  });
console.log(bundleTypesImport);
  var bundleStream = gulp.src('_sass/hamburgers/hamburgers.scss')
    .pipe(sass({
      data: bundleTypesImport
    }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('dist'))
    .pipe(csscomb('.csscomb.dist.json'))
    // .pipe(cssnano())
    .pipe(rename('hamburgers.min.css'))

  return merge(streams, bundleStream);
});


gulp.task('watch', function() {
  var browserSyncConfig = require('./bs-config.js');

  browserSync.init(browserSyncConfig);

  gulp.watch('_sass/**/*.scss', gulp.series('dist:css'));
});

gulp.task('build', gulp.series('sass'));

gulp.task('dist', gulp.series('dist:css'));

gulp.task('default', gulp.series('build', 'watch'));
