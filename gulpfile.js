var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps')
    shell = require('gulp-shell'),
    gulpTypings = require("gulp-typings");

gulp.task('clean', function() {
  del(['built']);
});

gulp.task('compile', function() {
  return compileTs('src', 'built');
});

gulp.task('clear-tsds', function() {
  del(['./tsd/typings/typings']);
});

gulp.task('install-tsds', function() {
  gulp.src("./tsd/typings/typings.json")
      .pipe(gulpTypings()); //will install all typingsfiles in pipeline.
});

gulp.task('default', ['compile']);

function compileTs(src, dst) {
  var tsResult = gulp
      .src('./src/**/*.ts')
      .pipe(sourcemaps.init())
      .pipe(ts({
          noImplicitAny: true,
          rootDir: '.',
          module: 'commonjs'
        }));
  return tsResult
      .js
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./built'));
}