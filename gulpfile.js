const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const util = require('gulp-util');
const gulpif = require('gulp-if');

const fail = function() {
    util.log("A component which does not force fail, failed.")
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
})

gulp.task('compile', ['clean'], function() {
    return gulp.src('./src/**').
           pipe(gulpif('**/*.ts', ts(tsv).on('error', fail))). // Compile TypeScript files.
           pipe(gulp.dest('./target/src'));
});

gulp.task('test', ['compile'], function() {
    return gulp.src(['./target/src/test/**/*.js', './target/src/js/test/*.js']).pipe(jasmine());
});

gulp.task('run-test', function() {
    return gulp.src(['./target/src/test/**/*.js', './src/target/js/test/*.js']).pipe(jasmine());
});

gulp.task('build', ['test'], function() {
    return gulp.src('./target/src/main/**').pipe(gulp.dest('./dest'))
});

gulp.task('clean', function() {
    return gulp.src(['./target', './dest'], {read: false}).pipe(clean());
});

