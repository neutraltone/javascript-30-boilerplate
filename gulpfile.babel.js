/**
 * Gulp Packages
 * =============
 * Import our gulp packages.
 */

import gulp from 'gulp';
import browserSync from 'browser-sync';
import cheerio from 'gulp-cheerio';
import header from 'gulp-header';
import imagemin from 'gulp-imagemin';
import path from 'path';
import plumber from 'gulp-plumber';
import pngquant from 'imagemin-pngquant';
import rename from 'gulp-rename';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import gulpStylelint from 'gulp-stylelint';
import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';


/**
 * Constants
 * ---------
 * Constants used throughout this boilerplate.
 */

import pkg from './package.json';
import options from './gulp-options.json';


/**
 * Banner Template
 * ---------------
 * Define our banner template which is injected into
 * the top of our minfied Stylesheet and JavaScript.
 */

const banner = [
  `/*!
    * ${pkg.name}
    * ${pkg.title}
    * ${pkg.url}
    * @author ${pkg.author}
    * @version ${pkg.version}
    * Copyright ${new Date().getFullYear()}. ${pkg.license} licensed.
    */`,
  '\n'
].join('');


/**
 * BrowserSync.io
 * --------------
 * - Runs css, js, images and svg-sprite tasks
 * - Serve project on: localhost:3000
 * - Watch css, js, images and svg files for changes
 */

gulp.task('serve', [
    'lint-sass',
    'sass',
    'images',
    'svg-sprite'
  ], () => {
    browserSync.init({
      server: options.dest.dist
    });
    gulp.watch(options.src.scss, ['lint-sass', 'sass']);
    gulp.watch(options.src.img, ['images']);
    gulp.watch(options.src.sprite, ['svg-sprite']);
    gulp.watch(`${options.dest.dist}/*.html`).on('change', browserSync.reload);
});


/**
 * Sass
 * -------
 * - Assign plugins to processors variable
 * - Create sourcemaps
 * - Process css with PostCSS
 * - Inject banner into finished file
 * - Add .min suffix
 * - Copy to destination
 */

gulp.task('sass', () => {
  return gulp.src(options.src.scss)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        options.dep.normalize
      ],
      outputStyle: 'compressed',
      errLogToConsole: true
    }))
    .pipe(autoprefixer({
			browsers: options.support.browser,
			cascade: false
		}))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(options.dest.css))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }))
});


/**
 * Lint Sass
 * -------
 * - Lints src files with stylelint
 */

gulp.task('lint-sass', () => {
  return gulp
    .src(options.src.scss)
    .pipe(gulpStylelint({
      reporters: [{
        formatter: 'string',
        console: true
      }],
      failAfterError: false,
      syntax: "scss"
    }));
});


/**
 * Image Optimisation
 * ------------------
 * - Compress images
 * - Copy to destination
 * - Reload BrowserSync
 */

gulp.task('images', () => {
  return gulp.src(options.src.img)
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        use: [pngquant()]
    }))
    .pipe(gulp.dest(options.dest.img))
    .pipe(browserSync.stream())
});


/**
 * SVG Sprite
 * ----------
 * - Define prefix based on folder name
 * - Sprite svg's
 * - Copy sprite.svg to destination
 * - Reload BrowserSync
 */

gulp.task('svg-sprite', () => {
  return gulp.src(options.src.sprite)
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(cheerio($ => $('svg').attr('style',  'display:none')))
    .pipe(gulp.dest(options.dest.img))
    .pipe(browserSync.stream())
});


// Default Task
gulp.task('default', ['serve']);

// Build Task
gulp.task('build', ['lint-sass', 'sass', 'images', 'svg-sprite']);
