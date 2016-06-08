const gulp          = require('gulp');
const jasmine       = require('gulp-jasmine');
const istanbul      = require('gulp-istanbul');
const ts            = require('gulp-typescript');
const clean         = require('gulp-clean');
const util          = require('gulp-util');
const gulpif        = require('gulp-if');
const sourcemaps    = require('gulp-sourcemaps');
const lazypipe      = require('lazypipe');
const remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
const tslint        = require('gulp-tslint');
const replace       = require('gulp-replace');
const dest          = require('gulp-dest');
const flatten       = require('gulp-flatten');

const fail = function() {
    util.log("A component which does not force fail, failed.");
    process.exit(1);
};

const tsv = ts.createProject({
    noEmitOnError: true,
    target: 'es5',
    module: 'commonjs',
    noImplicitAny: true
});

const tst = ts.createProject({
    noEmitOnError: true,
    target: 'es5',
    module: 'commonjs',
    noImplicitAny: true
});

const compile_ts = lazypipe()
    .pipe(sourcemaps.init)
    .pipe(function() { 
        return ts(tsv).on('error', fail); })
    .pipe(sourcemaps.write, './maps');
    
const sourcemap_js = lazypipe()
    .pipe(sourcemaps.init, {identityMap: true}) // identityMap is turned on because of how the coverage remapper works.
    .pipe(sourcemaps.write, './maps');

gulp.task('compile', ['clean'], function() {
    return gulp.src('./src/**')
        .pipe(gulpif('**/*.ts', compile_ts()))
        .pipe(gulpif('**/*.js', sourcemap_js()))
        .pipe(gulp.dest('./target/src'));
});

gulp.task('lint', function() {
    return gulp.src('./src/**/*.ts')
       .pipe(tslint())
       .pipe(tslint.report("prose", {
             emitError: false
       }));
});

gulp.task('test-prepare', ['compile'], function() {
    return gulp.src(['./target/src/*.js', './target/src/**/*.js'])
        .pipe(istanbul({includeUntested: true}))
        .pipe(istanbul.hookRequire());
});

gulp.task('test-run', ['test-prepare'], function() {
    return gulp.src(['./target/src/test/**/*.js', './target/src/js/test/*.js'])
        .pipe(jasmine())
        .pipe(istanbul.writeReports({
            dir: './target/assets/unit-test-coverage',
            reporters: [ 'json' ], // Report json to transform
            reportOpts: { dir: './target/assets/unit-test-coverage'}
        }));
});

gulp.task('test-report', ['test-run'], function() {
    return gulp.src("./target/assets/unit-test-coverage/coverage-final.json")
        .pipe(remapIstanbul({
            reports: {
                'html': './target/assets/unit-test-coverage/html-report',
                'json': './target/assets/unit-test-coverage/coverage.json',
                'lcovonly': './target/assets/unit-test-coverage/lcov.info'
            }
        }));
});

gulp.task('test-report-coveralls', ['test-report'], function() {
    return gulp.src("./target/assets/unit-test-coverage/lcov.info")
        .pipe(replace("SF:", "SF:src/"))
        .pipe(gulp.dest('./target/assets/unit-test-coverage/'));
});

gulp.task('test', ['test-report-coveralls']);

gulp.task('copy-dependencies', ['clean'], function() {
    return gulp.src([
        './node_modules/jquery/dist/*.+(js|map)',
        './node_modules/materialize-css/bin/*.+(css|js)'
    ], { base: './' })
        .pipe(flatten())
        .pipe(gulpif('*.+(map|js)', dest('js')))
        .pipe(gulpif('*.css', dest('css')))
        .pipe(gulp.dest('./dest'));
});

gulp.task('build', ['test', 'lint', 'copy-dependencies'], function() {
    return gulp.src('./target/src/main/**')
        .pipe(gulpif("**/*.js", replace(/.*exports[^\n;]*(;|\n)/g, "")))
        .pipe(gulp.dest('./dest'));
});

gulp.task('clean', function() {
    return gulp.src(['./target', './dest'], {read: false}).pipe(clean());
});

