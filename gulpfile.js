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
    .pipe(gulp.dest('public/build'));
});

gulp.task('browserify:production', function() {
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
    .pipe(uglify({outSourceMap: false}))
    .pipe(gulp.dest('public/build'));
});

gulp.task('stylus', function() {
  gulp.src(['public/styles/**'])
    .pipe(stylus())
    .pipe(gulp.dest('public/build'));
});

gulp.task('lint', function() {
  gulp.src('*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('env', function(){
  var firebaseUrl = '';

  if(typeof env === 'undefined'){
    try {
      var localconfig = require('localconfig');
    } 
    catch (e) {
      console.log('You should define a localconfig.js, see the sample!');
      return true;
    }
  }
  if('production' === env){
    firebaseUrl = 'https://wiser.firebaseio.com/';
  }
  if('staging' === staging) {
    firebaseUrl = 'https://wiser-staging.firebaseio.com/';
  }
  console.log('ENV', env, staging);
  console.log('Firebase', firebaseUrl);
  fs.writeFile('localconfig.js', 'exports.localFirebase = "' + firebaseUrl + '";');
});

gulp.task('default', ['lint', 'env', 'browserify', 'stylus'], function() {
  var server = livereload();

  gulp.watch(['public/**/*.js', '!public/build/**'], ['browserify']);
  gulp.watch(['public/styles/**.styl'], ['stylus']);

  gulp.watch(['public/build/**', 'public/templates/**']).on('change', function(file) {
    console.log(file.path);
    server.changed(file.path);
  });
});

gulp.task('build', ['env', 'browserify:production', 'stylus']);