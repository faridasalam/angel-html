'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gutil        = require('gulp-util');
var jshint       = require('gulp-jshint');
var sourcemaps   = require('gulp-sourcemaps');
var gulpif       = require('gulp-if');
var uglify       = require('gulp-uglify');
var stylish      = require('jshint-stylish');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var imagemin     = require('gulp-imagemin');
var fileinclude  = require('gulp-file-include');
var inject       = require('gulp-inject-string');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();

var devMode      = false;

var path = {
    src: { // source
        html    : 'app/*.html',
        htminc  : 'app/_sections/**/*.htm',
        incdir  : 'app/_sections/',
        plugins : 'app/plugins/**/*.*',
        js      : 'app/js/*.js',
        scss    : 'app/scss/**/*.scss',
        img     : 'app/img/**/*.+(png|jpg|gif)',
        options : 'app/options/**/*.*'
    },
    build: { // build
        dir     : devMode ? 'builds/development/' : 'builds/public/',
    }
};


/* =====================================================
    HTML
    ===================================================== */

gulp.task('html:build', function() {
  return gulp.src( path.src.html )
    .pipe(customPlumber('Error Running html-include'))
    .pipe(gulpif( !devMode, inject.before('</body', '<script src="test.js"></script>\n')))
    .pipe(fileinclude({ basepath: path.src.incdir }))
    .pipe(gulp.dest( path.build.dir ))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/* =====================================================
    SCSS
    ===================================================== */

gulp.task('scss:build', function() {
  var ignoreNotification = false;
  return gulp.src( path.src.scss )
    .pipe(customPlumber('Error Running Sass'))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest( path.build.dir + 'css/' ))
    .pipe(browserSync.reload({
      stream: true
    }));
})


/* =====================================================
    JS
    ===================================================== */

gulp.task('js:build', function() {
  return gulp.src( path.src.js )
    .pipe(customPlumber('Error Running JS'))
    .pipe(jshint('./.jshintrc'))
    .pipe(notify(function (file) {
      if (!file.jshint.success) {
        return file.relative + " (" + file.jshint.results.length + " errors)\n";
      }
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .on('error', gutil.log)
    .pipe(gulpif( !devMode, uglify()))
    .pipe(gulp.dest( path.build.dir + 'js/' ))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/* =====================================================
    IMAGE
    ===================================================== */

gulp.task('img:build', function() {
  return gulp.src( path.src.img )
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest( path.build.dir + 'img/' ))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/* =====================================================
    PLUGINS
    ===================================================== */

gulp.task('plugins:build', function() {
  return gulp.src( path.src.plugins )
    .pipe(gulp.dest( path.build.dir + 'plugins/' ))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/* =====================================================
    OPTIONS
    ===================================================== */

gulp.task('options:build', function() {
  return gulp.src( path.src.options )
    .pipe(gulpif( !devMode, gulp.dest( path.build.dir + 'options/' )))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/* =====================================================
    WATCH BUILD
    ===================================================== */

gulp.task('watch:build', function() {
  gulp.watch( path.src.html, ['html:build'] );
  gulp.watch( path.src.htminc, ['html:build'] );
  gulp.watch( path.src.scss, ['scss:build'] );
  gulp.watch( path.src.js, ['js:build'] );
  gulp.watch( path.src.img, ['img:build'] );
  gulp.watch( path.src.img, ['options:build'] );
});


/* =====================================================
    ERROR MESSAGE
    ===================================================== */

function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      // Customizing error title
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>",
      sound: "Glass"
    })
  });
}


/* =====================================================
    BUILD TASK
    ===================================================== */

gulp.task('build', [
  'html:build',
  'scss:build',
  'js:build',
  'img:build',
  'plugins:build',
  'options:build',
  'watch:build'
], function() {
  browserSync.init({
    server: {
      baseDir: path.build.dir
    },
    port: 8001
  });
});


/* =====================================================
    DEFAULT TASK
    ===================================================== */

gulp.task('default', ['build']);
