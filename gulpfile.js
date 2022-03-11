const{src,dest,watch,series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer=require('autoprefixer');
const cssnano=require('cssnano');
const babel = require('gulp-babel')
const terser=require('gulp-terser');
const browsersync-require('browser-sync').create();

exports.build=series(scssTask,jsTask);