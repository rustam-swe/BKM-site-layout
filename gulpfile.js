const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const gulpSass = require("gulp-sass");
const gulpPug = require("gulp-pug");
const del = require("del");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "dist/"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function clean() {
  return del(["dist"]);
}

function pug() {
  return gulp
    .src("src/layouts/*.pug")
    .pipe(
      gulpPug({
        pretty: true
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browsersync.stream());
}

function css() {
  return gulp
    .src("src/styles/*.css")
    .pipe(gulp.dest("dist/css/"))
    .pipe(browsersync.stream());
}

function sass() {
  return gulp
    .src("src/sass/*.scss")
    .pipe(gulpSass())
    .pipe(gulp.dest("dist/css/"))
    .pipe(browsersync.stream());
}

function scripts() {
  return gulp
    .src("src/scripts/*.js")
    .pipe(gulp.dest("dist/js/"))
    .pipe(browsersync.stream());
}

function assets() {
  return gulp
    .src("src/assets/**/*")
    .pipe(gulp.dest("dist/assets/"))
    .pipe(browsersync.stream());
}

function watchFiles() {
  gulp.watch("src/layouts/*", pug);
  gulp.watch("src/styles/*", css);
  gulp.watch("src/sass/*", sass);
  gulp.watch("src/assets/*", assets);
  gulp.watch("src/scripts/*", scripts);
  gulp.series(browserSyncReload);
}

gulp.task("pug", pug);
gulp.task("css", css);
gulp.task("sass", sass);
gulp.task("assets", assets);
gulp.task("scripts", scripts);

gulp.task("default", gulp.series(clean, pug, sass, css, scripts, assets));

gulp.task("dev", gulp.parallel(watchFiles, browserSync));