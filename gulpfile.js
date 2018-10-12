const del = require(`del`);
const gulp = require(`gulp`);
const plumber = require(`gulp-plumber`);
const server = require(`browser-sync`).create();
const imagemin = require(`gulp-imagemin`);
const rollup = require(`gulp-better-rollup`);
const sourcemaps = require(`gulp-sourcemaps`);
const ghpages = require("gh-pages");

gulp.task(`style`, () => {
  return gulp.src(`css/style.css`).
    pipe(gulp.dest(`build/css`));
});

gulp.task(`scripts`, () => {
  return gulp.src(`js/main.js`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rollup({}, `iife`))
    .pipe(sourcemaps.write(``))
    .pipe(gulp.dest(`build/js`));
});

gulp.task(`images`, () => {
  return gulp.src(`src/img/**/*.{png,jpg,gif}`)
    .pipe(imagemin([
      imagemin.gifsicle(),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest(`build/img`));
});

gulp.task(`copy-html`, () => {
  return gulp.src(`*.{html,ico}`).
    pipe(gulp.dest(`build`)).
    pipe(server.stream());
});

gulp.task(`copy`, [`copy-html`, `scripts`, `style`, `images`], () => {
  return gulp.src([
    `fonts/**/*.{woff,woff2}`,
    `img/*.*`
  ], {base: `.`}).
    pipe(gulp.dest(`build`));
});

gulp.task(`clean`, () => {
  return del(`build`);
});

gulp.task(`js-watch`, [`scripts`], (done) => {
  server.reload();
  done();
});

gulp.task(`serve`, [`assemble`], () => {
  server.init({
    server: `./build`,
    notify: false,
    open: true,
    port: 3502,
    ui: false
  });

  gulp.watch(`css/**/*.{css}`, [`style`]);
  gulp.watch(`*.html`).on(`change`, (e) => {
    if (e.type !== `deleted`) {
      gulp.start(`copy-html`);
    }
  });
  gulp.watch(`js/**/*.js`, [`js-watch`]);
});

gulp.task(`assemble`, [`clean`], () => {
  gulp.start(`copy`, `style`);
});

gulp.task(`build`, [`assemble`], () => {
  gulp.start(`images`);
});

gulp.task(`test`, () => {
});

ghpages.publish(`build`);
