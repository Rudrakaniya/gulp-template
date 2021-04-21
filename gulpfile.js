const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const { parallel, series } = require('gulp');


// compile scss into css
function style() {
    // 1. Where is my scss file
    return gulp.src('./styling/scss/**/*.scss')
    // 2. Pass scss file through scss compiler
        .pipe(sass().on('error', sass.logError))
    // 3. Where do I save the file
        .pipe(gulp.dest('./styling/css'))
    // 4. cleanCSS
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./styling/css'));
}

// Compress images
function imgTask() {
    return gulp.src('./assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./assets/images'));
}

// Watch function
function watch() {
    gulp.watch('./styling/scss/**/*.scss', style);
}

exports.style = style;
exports.imgTask = imgTask;
exports.watch = watch;
exports.default = series(parallel(style, imgTask), watch);