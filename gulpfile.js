var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('browserify', function() {
  gulp.src('public/app.js')
    .pipe(browserify({debug: true}))
    .pipe(gulp.dest('public/build'));
});

gulp.task('stylus', function() {
  gulp.src(['public/styles/**'])
    .pipe(stylus())
    .pipe(gulp.dest('public/build'));
});

gulp.task('default', function() {
  gulp.watch(['public/**/*.js', '!public/build/**'], ['browserify']);
  gulp.watch(['public/styles/**.styl'], ['stylus']);
});