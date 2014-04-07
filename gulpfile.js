var gulp = require('gulp');
var browserify = require('gulp-browserify');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');

gulp.task('browserify', function() {
  gulp.src('public/app.js')
    .pipe(browserify({debug: true, insertGlobals : true}))
    .pipe(uglify({outSourceMap: true}))
    .pipe(gulp.dest('public/build'));
});

gulp.task('stylus', function() {
  gulp.src(['public/styles/**'])
    .pipe(stylus())
    .pipe(gulp.dest('public/build'));
});

gulp.task('default', ['browserify', 'stylus'], function() {
  gulp.watch(['public/**/*.js', '!public/build/**'], ['browserify']);
  gulp.watch(['public/styles/**.styl'], ['stylus']);
});