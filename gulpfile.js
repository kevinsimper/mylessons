'use strict';
var fs = require('fs');
var gulp = require('gulp');
var replace = require('gulp-replace');
var browserify = require('gulp-browserify');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');

var env = process.env.NODE_ENV;
var staging = process.env.ENV;

var shim = {
  angular: {
    path: 'public/vendor/angular/angular.js',
    exports: 'angular'
  },
  jquery: {
    path: 'public/vendor/jquery/jquery-2.1.0.js',
    exports: 'jQuery'
  }
};

gulp.task('browserify:debug', function() {
  gulp.src('public/app.js')
    .pipe(plumber())
    .pipe(browserify({
      debug: true,
      shim: shim
    }))
    .pipe(gulp.dest('public/build'));
});

gulp.task('browserify:production', function() {
  gulp.src('public/app.js')
    .pipe(plumber())
    .pipe(browserify({
      debug: true,
      shim: shim
    }))
    .pipe(uglify({outSourceMap: false}))
    .pipe(gulp.dest('public/build'));
});

gulp.task('stylus', function() {
  gulp.src(['public/styles/**'])
    .pipe(stylus())
    .pipe(gulp.dest('public/build'));
});

gulp.task('lint', function() {
  gulp.src(['public/**/*.js', '!public/vendor/**', '!public/build/*.js']  )
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('env', function(){
  var firebaseUrl = '';

  if(typeof env === 'undefined'){
    try {
      var localconfig = require('./localconfig');
      console.log('local', localconfig);
      firebaseUrl = localconfig.localFirebase;
    } 
    catch (e) {
      console.log('You should define a localconfig.js, see the sample!');
      return true;
    }
  } else {
    if('production' === env){
      firebaseUrl = 'https://wiser.firebaseio.com/';
    }
    if('staging' === staging) {
      firebaseUrl = 'https://wiser-staging.firebaseio.com/';
    }
    fs.writeFile('localconfig.js', 'exports.localFirebase = "' + firebaseUrl + '";');
  }
  console.log('ENV', env, staging);
  console.log('Firebase', firebaseUrl);
});

gulp.task('default', ['lint', 'env', 'browserify:debug', 'stylus'], function() {
  var server = livereload();

  gulp.watch(['public/**/*.js', '!public/build/**'], ['browserify:debug']);
  gulp.watch(['public/styles/**.styl'], ['stylus']);

  gulp.watch(['public/build/**', 'public/templates/**']).on('change', function(file) {
    console.log(file.path);
    server.changed(file.path);
  });
});

if('staging' === staging || 'production' !== env) {
  gulp.task('build', ['env', 'browserify:debug', 'stylus']);
} 
if('production' === env) {
  gulp.task('build', ['env', 'browserify:production', 'stylus']);
}
