const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

// Caminhos para os arquivos
const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'dist/images'
    }
};

// Tarefa de compilação do SASS
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.dest));
}

// Tarefa de compressão de imagens
function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

// Tarefa de compressão de código JavaScript
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
}

// Tarefa para observar mudanças nos arquivos
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, images);
}

// Definindo as tarefas disponíveis
const build = gulp.series(gulp.parallel(styles, images, scripts));
gulp.task('build', build);
gulp.task('watch', watch);

exports.styles = styles;
exports.images = images;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
