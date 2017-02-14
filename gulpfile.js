'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gutil        = require('gulp-util');
var w3cjs        = require('gulp-w3cjs');
var jshint       = require('gulp-jshint');
var scsslint     = require('gulp-scss-lint');
var sourcemaps   = require('gulp-sourcemaps');
var gulpif       = require('gulp-if');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var stylish      = require('jshint-stylish');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var minifyHTML   = require('gulp-minify-html');
var imagemin     = require('gulp-imagemin');
var fileinclude  = require('gulp-file-include');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();

var path = {
    src: { // source
        html    : 'app/*.html',
        htminc  : 'app/_sections/',
        plugins : 'app/plugins/**/*.*',
        js      : 'app/js/*.js',
        scss    : 'app/scss/**/*.scss',
        img     : 'app/img/**/*.+(png|jpg|gif)',
        options : 'app/options/**/*.*'
    },
    build: { // development
        dir     : 'build/',
        html    : 'build/*.html',
        plugins : 'build/plugins/**/*.*',
        plugdir : 'build/plugins/',
        js      : 'build/js/*.js',
        jsdir   : 'build/js/',
        css     : 'build/css/*.css',
        cssdir  : 'build/css/',
        img     : 'build/img/**/*.+(png|jpg|gif)',
        imgdir  : 'build/img/'
    },
    public: { // production
        dir     : 'public/',
        imgdir  : 'public/img/',
        optdir  : 'public/options/'
    }
};


/* =====================================================
    HTML
    ===================================================== */

gulp.task('html:build', function() {
  return gulp.src( path.src.html )
    .pipe(customPlumber('Error Running html-include'))
    .pipe(fileinclude({ basepath: path.src.htminc }))
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
    .pipe(sourcemaps.write())
    .pipe(gulp.dest( path.build.cssdir ))
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
    .pipe(gulp.dest( path.build.jsdir ))
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
    .pipe(gulp.dest( path.build.imgdir ))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/* =====================================================
    PLUGINS
    ===================================================== */

gulp.task('plugins:build', function() {
  return gulp.src( path.src.plugins )
    .pipe(gulp.dest( path.build.plugdir ))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/* =====================================================
    COPY IMAGE
    ===================================================== */

  gulp.task('copy:images', function() {
    return gulp.src( path.build.img )
      .pipe(gulp.dest( path.public.imgdir ))
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
    PUBLIC TASK
    ===================================================== */

gulp.task('public', [
  'copy:images'
], function() {
  browserSync.init({
    server: {
      baseDir: path.public.dir
    },
    port: 8002
  });
});


/* =====================================================
    DEFAULT TASK
    ===================================================== */

gulp.task('default', ['build']);
