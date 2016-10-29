var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    spritesmith = require('gulp.spritesmith'),
    autoprefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    rename = require('gulp-rename');

var path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        js: 'build/script/',
        img: 'build/img/',
        sprite: 'src/img/',
        spriteCss: 'src/css/partials/',        
        fonts: 'build/fonts/',
        libs:'build/script/libs/'
    },
    src: {
        html: 'src/*.html',
        sass: 'src/css/*.scss',
        js: 'src/script/*.js',
        img: 'src/img/*.*',
        sprite: 'src/img/sprite/*.png',        
        fonts: 'src/fonts/**/*.*',
        libs: 'src/script/libs/*.js'
    },
    watch: {
        html: 'src/*.html',
        sass: 'src/css/**/*.scss',
        js: 'src/script/*.js',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        libs: 'src/script/libs/*.js'
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
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 15 versions', 'ie 8'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(rigger())     
        .pipe(sourcemaps.init())       
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('libs:build', function() {
    gulp.src(path.src.libs)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.libs))
        .pipe(reload({stream: true}));
});

gulp.task('sprite:build', function() {
    var spriteData = 
        gulp.src(path.src.sprite) 
        .pipe(plumber())
        .pipe(spritesmith({
            imgName: 'sprite-user.png',
            cssName: '_sprite-user.scss',
            cssFormat: 'sass',
            algorithm: 'left-right',
            padding: 5
        }));

    spriteData.img.pipe(gulp.dest(path.build.sprite)); 
    spriteData.css.pipe(gulp.dest(path.build.spriteCss));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(plumber())
        .pipe(imagemin({
            plugins: [imagemin.jpegtran(), imagemin.optipng()],
            verbose: false
        }))
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
    'sprite:build',
    'image:build',
    'font:build',
    'libs:build'
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
    watch([path.watch.libs], function(event, cb) {
        gulp.start('libs:build');
    });  

});

gulp.task('default', ['build', 'browser-sync', 'watch']);
