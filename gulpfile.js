/////////////////////////////
// Required
/////////////////////////////
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    prefix = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    dedupe = require('gulp-dedupe'),
    clean = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    del = require('del');

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
    .pipe(prefix({
        browsers: ['> 5%'],
        cascade: false
    }))
    .pipe(clean())
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream:true}));
});

/////////////////////////////
// HTML Task
/////////////////////////////
gulp.task('html', function() {
    gulp.src('app/**/*.html')
    .pipe(reload({stream:true}));
})

/////////////////////////////
// Build Tasks
/////////////////////////////
gulp.task('build', function() {
    gulp.src('app/**/*.html').pipe(gulp.dest('build/'));
    gulp.src('app/css/**/*.css').pipe(gulp.dest('build/css/'));
    gulp.src('app/js-dist/*.jss').pipe(gulp.dest('build/js/'));
    gulp.src('app/img/**/*').pipe(gulp.dest('build/img/'));
});

/////////////////////////////
// browserSync Task
/////////////////////////////
gulp.task('browser-sync', function() {
    browserSync({
        server:{
            baseDir: "./app/"
        }
    });
});

/////////////////////////////
// Watch Task
/////////////////////////////
gulp.task('watch', function() {
    gulp.watch(['app/js/**/*.js','!app/js/all.*'], ['scripts']);
    gulp.watch(['app/sass/**/*.sass'], ['sass']);
    gulp.watch(['app/**/*.html'], ['html']);

});

/////////////////////////////
// Default Task
/////////////////////////////
gulp.task('default', ['scripts','sass','html','browser-sync','watch']);
