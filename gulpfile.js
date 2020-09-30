const { src, dest, watch, series, parallel, tree } = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const scss = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const minify = require("cssnano");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const clean = require("gulp-clean");

const files = {
  scssPath: "src/main.scss",
};

const cleanDist = () => {
  return src("dist", { read: false, allowEmpty: true })
    .pipe(clean());
};

const optimizeSCSS = () => {
  return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(scss())
    .pipe(postcss([ autoprefixer(), minify() ]))
    .pipe(rename("printify.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist"));
}


const watcher = () => {
  watch(
    ["src/**/*.scss"],
    parallel(optimizeSCSS)
  );
};

exports.default = series(
  cleanDist,
  parallel(optimizeSCSS),
  watcher
);