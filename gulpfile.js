var gulp = require('gulp');
var browserify = require('gulp-browserify');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

gulp.task('browserify', function() {
  gulp.src('public/app.js')
    .pipe(browserify({debug: true}))
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
  gulp.watch(['public/**/*.js', '!public/build/**'], ['browserify']);
  gulp.watch(['public/styles/**.styl'], ['stylus']);
});