'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

gulp.paths = {
  src: 'src',
  dist: 'dist'
};


gulp.task('build', ['clean'], function () {
    gulp.start('buildapp');
});