'use strict'

const cp = require('child_process')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cleancss = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const del = require('del')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const responsive = require('gulp-responsive')
const pngquant = require('imagemin-pngquant')
const browserSync = require('browser-sync')
const queries = require('css-mqpacker')
const perfectionist = require('perfectionist')
const atImport = require('postcss-import')
const media = require('postcss-custom-media')
const vars = require('postcss-css-variables')
const conditionals = require('postcss-conditionals')
const nested = require('postcss-nested')
const runSequence = require('run-sequence')

// other variables
// PostCSS plugins. Order matters here!
const plugins = [
  atImport(),
  vars(),
  nested(),
  conditionals(),
  media(),
  queries(),
  perfectionist({ format: 'compact' }),
  autoprefixer()
]
const cleanCssOpts = { advanced: false, keepSpecialComments: 0 }
const imageOpts = {
  responsive: [
    {
      '**/*.jpg': {
        quality: 75
      },
      '**/*.png': {
        quality: 75
      }
    }, {
      progressive: true,
      errorOnUnusedConfig: false,
      errorOnUnusedImage: false,
      errorOnEnlargement: false
    }],
  imagemin: {
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }
}
const jekyllFiles = ['index.html', '_includes/*.html', '_layouts/*.html', '*.md', '_posts/*', 'assets/**']

// TASKS
// =====================================================

// bundle install
gulp.task('bundle-install', done => {
  browserSync.notify('Running bundle install...')
  return cp.spawn('bundle', ['install'], {stdio: 'inherit'})
    .on('close', done)
})

// build the Jekyll site
gulp.task('jekyll-build', done => {
  browserSync.notify('Building Jekyll')
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
    .on('close', done)
})

// trigger BrowserSync reload upon rebuild
gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
  browserSync.reload()
})

// start BrowserSync
gulp.task('browser-sync', ['jekyll-build'], () => {
  browserSync({
    server: {
      baseDir: '_site'
    },
    host: "localhost"
  })
})

// compile and minify CSS
gulp.task('styles', () => {
  return gulp.src('dev_assets/styles/main.pcss')
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(cleancss(cleanCssOpts))
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/styles'))
    .pipe(browserSync.reload({ stream: true }))
})

// concatenate and minify javascript
gulp.task('scripts', () => {
  return gulp.src(['dev_assets/js/*.js'])
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
})

// compress and copy images
gulp.task('images', () => {
  return gulp.src('dev_assets/img/**')
    .pipe(responsive(...imageOpts.responsive))
    .pipe(imagemin(imageOpts.imagemin))
    .pipe(gulp.dest('assets/img'))
})

// clean up assets folder
gulp.task('clean', () => {
  return del(['assets', 'docs'])
})

gulp.task('copy-cname', () => {
  return gulp.src('config/CNAME').pipe(gulp.dest('docs'))
})

gulp.task('copy-to-docs', () => {
  return gulp.src('_site/**').pipe(gulp.dest('docs'))
})

// build process to be run in sequence to ensure everything runs in proper order
gulp.task('build', cb => {
  runSequence('bundle-install', 'clean', ['styles', 'images'], 'jekyll-build', cb)
})

gulp.task('compile', cb => {
  runSequence('bundle-install', 'clean', ['styles', 'images'], 'jekyll-build', 'copy-cname', 'copy-to-docs', cb)
})

// build files and watch for changes
gulp.task('watch', () => {
  gulp.watch('dev_assets/styles/*', ['styles'])
  gulp.watch('dev_assets/js/*', ['scripts'])
  gulp.watch('dev_assets/img/**', ['images'])
  gulp.watch(jekyllFiles, ['jekyll-rebuild'])
})

// serve task runs bundle-install, kicks off build, starts server, watches for changes
gulp.task('serve', ['build'], () => {
  gulp.start('browser-sync', 'watch')
})

// default task kicks off serve
gulp.task('default', ['serve'])
