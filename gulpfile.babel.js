import gulp from 'gulp';
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const concat = require("gulp-concat");
const uglifyJs = require("gulp-uglifyjs");
const cssNano = require("gulp-cssnano");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
import babel from 'gulp-babel';
gulp.task("sass", function () {
  return gulp
    .src("src/sass/**/*.sass")
    .pipe(sass())
    .pipe(
      autoprefixer(["last 10 versions"], {
        cascade: truegu
      })
    )
    .pipe(gulp.dest("src/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("browser-sync", function () {
  browserSync({
    server: {
      baseDir: "src"
    }
  });
});

gulp.task("watch", ["browser-sync"], function () {
  gulp.watch("src/sass/**/*.sass", ["sass"]);
  gulp.watch("src/js/**/*.js", browserSync.reload);
  gulp.watch("src/**/*.html", browserSync.reload);
});

gulp.task("min-js", function () {
  return gulp
    .src([
      "src/libs/jquery/dist/jquery.min.js",
      "src/libs/slick-carousel/dist/slick.min.js"
    ])
    .pipe(concat("libs.min.js"))
    .pipe(uglifyJs())
    .pipe(gulp.dest("src/js"));
});

gulp.task("clean", function () {
  return del.sync("dist");
});

gulp.task("build", ["clean", "min-css", "min-js"], function () {
  const buildCss = gulp
    .src(["src/css/libs.min.css", "src/css/main.css"])
    .pipe(gulp.dest("dist/css"));

  const buildFonts = gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts"));

  const buildJs = gulp.src("src/js/**/*").pipe(gulp.dest("dist/js"));

  const buildHtml = gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

gulp.task("scripts", () =>
  gulp
    .src("src/js/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("src/scripts"))
);

gulp.task("compile", function () {
  "use strict";
  var twig = require("gulp-twig");
  return gulp
    .src("./index.twig")
    .pipe(
      twig({
        data: {
          title: "Gulp and Twig",
          benefits: ["Fast", "Flexible", "Secure"]
        }
      })
    )
    .pipe(gulp.dest("./"));
});

gulp.task("default", ["compile"]);

gulp.task("default", ["sass", "scripts"]);
