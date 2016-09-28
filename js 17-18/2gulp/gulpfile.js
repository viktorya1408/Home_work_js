var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');
    cleanCSS = require('gulp-clean-css');


gulp.task('script', function () {
  gulp.src('script/src/*.js')
  .pipe(concat('js.min.js', {newLine: ';'}))
  .pipe(uglify())
  .pipe(gulp.dest('script/build/'));
});


gulp.task('style', function () {
  gulp.src('css/src/*.css')
  .pipe(concat('style.min.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('css/build/'));
});

gulp.task('default', ['script', 'style']);