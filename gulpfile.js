var browserSync  = require('browser-sync'),
    del          = require('del'),
    gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    htmlmin      = require('gulp-htmlmin'),
    imagemin     = require('gulp-imagemin'),
    minify       = require('gulp-minify-css'),
    sass         = require('gulp-sass'),
    uglify       = require('gulp-uglify');

gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
  return gulp.src('sass/style.scss')
    .pipe(sass({ style: "expanded" }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('css', ['sass'], function() {
  return gulp.src([
      'css/normalize.css',
      'css/skeleton.css',
      'build/css/style.css'
    ])
    .pipe(concat('style.min.css'))
    .pipe(minify())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
  return gulp.src([
    'js/typekit.js',
    'js/analytics.js'
  ])
  .pipe(concat('script.min.js'))
  .pipe(uglify({ preserveComments: 'none', outSourceMap: false }))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('img', function() {
  return gulp.src('images/*')
    .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('clean', function(cb) {
  del(['dist', 'build'], cb);
});

gulp.task('default', ['clean'], function() {
  gulp.start('html', 'css', 'js', 'img');
});

gulp.task('dev', ['default'], function() {
  browserSync({
    server: {
      baseDir: './'
    },
    notify: false
  });

  gulp.watch('index.html', [browserSync.reload]);
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('js/**/*.js', ['js']);
});
