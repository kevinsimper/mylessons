var gulp = require('gulp');
var browserify = require('gulp-browserify');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');

gulp.task('browserify', function() {
  gulp.src('public/app.js')
    .pipe(plumber())
    .pipe(browserify({
      debug: true,
      shim: {
        angular: {
          path: 'public/vendor/angular/angular.js',
          exports: 'angular'
        }
      }
    }))
    // .pipe(uglify({outSourceMap: false}))
    .pipe(gulp.dest('public/build'));
});

gulp.task('stylus', function() {
  gulp.src(['public/styles/**'])
    .pipe(stylus())
    .pipe(gulp.dest('public/build'));
});

gulp.task('lint', function() {
  gulp.src('public/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['lint', 'browserify', 'stylus'], function() {
  var server = livereload();

  gulp.watch(['public/**/*.js', '!public/build/**'], ['browserify'])
  .on('change', function(file) {
      console.log(new Date());
      console.log(file.path);
    });
  gulp.watch(['public/styles/**.styl'], ['stylus']);

  gulp.watch(['public/build/**', 'public/templates/**']).on('change', function(file) {
    console.log(file.path);
    server.changed(file.path);
  });
});

gulp.task('build', ['browserify', 'stylus']);