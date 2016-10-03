var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    reload = browserSync.reload;


var path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        js: 'build/script/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        sass: 'src/css/*.scss',
        js: 'src/script/*.js',
        img: 'src/img/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/*.html',
        sass: 'src/css/*.scss',
        js: 'src/script/*.js',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    }
};

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('html:build', function() {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});        

gulp.task('style:build', function() {
    gulp.src(path.src.sass)
        .pipe(plumber())
        .pipe(sass())
        .pipe(cleanCSS())        
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(concat('js.min.js', {newLine: ';'}))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function() {
    gulp.src(path.src.img)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});


gulp.task('font:build', function() {
    gulp.src(path.src.fonts)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'style:build',
    'js:build',
    'image:build',
    'font:build',
    'browser-sync'
]);

gulp.task('watch', function() {

    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.sass], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('font:build');
    });

});

gulp.task('default', ['build', 'watch']);