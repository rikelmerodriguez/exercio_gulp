const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

const paths = {
    styles: {
        src: 'src/sass/**/*.scss',
        dest: 'dist/css'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'dist/images'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js'
    }
};

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.dest));
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
}

function watchFiles() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
}

const build = gulp.series(gulp.parallel(styles, images, scripts), watchFiles);

exports.styles = styles;
exports.images = images;
exports.scripts = scripts;
exports.watch = watchFiles;
exports.build = build;
exports.default = build;
