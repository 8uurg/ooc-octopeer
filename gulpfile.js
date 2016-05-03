const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const istanbul = require('gulp-istanbul');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const util = require('gulp-util');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const lazypipe = require('lazypipe');
const remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
const tslint = require('gulp-tslint');


const fail = function() {
    util.log("A component which does not force fail, failed.");
    process.exit(1);
};

const tsv = ts.createProject({
    noEmitOnError: true,
    target: 'es6',
    module: 'commonjs',
    noImplicitAny: true
});
const tst = ts.createProject({
    noEmitOnError: true,
    target: 'es6',
    module: 'commonjs',
    noImplicitAny: true
});

gulp.task('lint', function() {
    // Add linting tasks here.
    return gulp.src('./src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report("prose", {
          emitError: false
        }));
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
            reporters: [ 'json', 'lcov' ], // Report json to transform
            reportOpts: { dir: './target/assets/unit-test-coverage'}
        }));
});

gulp.task('test-report', ['test-run'], function() {
    return gulp.src("./target/assets/unit-test-coverage/coverage-final.json")
        .pipe(remapIstanbul({
            reports: {
                'json': './target/assets/unit-test-coverage/coverage.json',
                'html': './target/assets/unit-test-coverage/html-report'
            }
        }));
});

gulp.task('test', ['test-report']); 

gulp.task('build', ['test'], function() {
    return gulp.src('./target/src/main/**').pipe(gulp.dest('./dest'));
});

gulp.task('clean', function() {
    return gulp.src(['./target', './dest'], {read: false}).pipe(clean());
});

