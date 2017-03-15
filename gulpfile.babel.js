const autoprefixer = require('gulp-autoprefixer')
const blok = require('gulp-blok')
const browserify = require('browserify')
const browserSync = require('browser-sync')
const buffer = require('vinyl-buffer')
const concat = require('gulp-concat')
const fs = require('fs')
const globbing = require('gulp-css-globbing')
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const reload = browserSync.reload
const sass = require('gulp-sass')
const source = require('vinyl-source-stream')
const tsify = require('tsify')
const watch = require('gulp-watch')
const config = require('./config.js')

const externals = require('./externals.js')
if (config.blok.domain == 'INSERT_YOUR_DOMAIN') {
  config.blok.domain = 'hello.me.storyblok.com'
}

if (config.blok.themeId == 'INSERT_SPACE_ID') {
  config.blok.themeId = '40032'
}

gulp.task('deploy', function () {
  return gulp.src('./views/**/*')
    .pipe(blok(config.blok))
})

gulp.task('styles', function () {
  return gulp.src('app/styles/**/*.{sass,scss}')
    .pipe(plumber())
    .pipe(globbing({
      extensions: ['.scss']
    }))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
      browsers: config.browsers
    }))
    .pipe(gulp.dest('./views/assets/'))
    .pipe(browserSync.stream());
})

gulp.task('scripts', function () {
  return browserify({
    entries: 'app/scripts/main.ts',
    debug: true
  }).plugin('tsify', {
    noImplicitAny: true,
    target: 'ES5'
    })  
    .bundle()
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./views/assets/'))
    .pipe(browserSync.stream());
})


gulp.task('scripts:vendor', function () {
  return gulp.src(externals)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./views/assets/'))
});


gulp.task('browsersync', function () {
  browserSync({
    port: 4200,
    serveStatic: ['./views'],
    proxy: {
      target: 'https://' + config.blok.domain,
      reqHeaders: function (config) {
        return {
          'accept-encoding': 'identity',
          'agent': false,
          'browsersyncblok': true
        }
      }
    },
    https: fs.existsSync('./cert.js') ? require('./cert') : false,
    reloadDelay: 1000,
    notify: true,
    open: true,
    logLevel: 'silent'
  })

  gulp.watch('views/**/*.liquid').on('change', reload)
  gulp.watch('app/styles/**/*', ['styles'])
  gulp.watch('app/scripts/**/*', ['scripts'])
  gulp.watch('./externals.js', ['scripts:vendor'])
})

gulp.task('default', ['styles', 'scripts', 'scripts:vendor', 'browsersync'], function () {
  return watch('./views/**/*')
    .pipe(blok(config.blok))
})
