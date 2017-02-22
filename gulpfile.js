/////////////////////////////
// Required
/////////////////////////////
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    dedupe = require('gulp-dedupe'),
    clean = require('gulp-clean-css'),
    concat = require('gulp-concat');

/////////////////////////////
// Scripts Task
/////////////////////////////
gulp.task('scripts', function() {
    gulp.src(['app/js/*.js', '!app/js/**/*.min.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('app/js-dist'))
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify().on('error', function(e) {gutil.log(gutil.colors.red('[Error]'), e.toString()); this.emit('end');}))
        .pipe(gulp.dest('app/js-dist'));
});

/////////////////////////////
// Sass Task
/////////////////////////////
gulp.task('sass', function() {
    gulp.src('app/sass/**/*.sass')
    .pipe(concat('styles.sass'))
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(clean())
    .pipe(gulp.dest('app/css'));
});

/////////////////////////////
// Watch Task
/////////////////////////////
gulp.task('watch', function() {
    gulp.watch(['app/js/**/*.js','!app/js/all.*'], ['scripts']);
    gulp.watch(['app/sass/**/*.sass'], ['sass']);
});

/////////////////////////////
// Default Task
/////////////////////////////
gulp.task('default', ['scripts','watch']);
