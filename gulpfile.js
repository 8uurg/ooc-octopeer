const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');

const tsv = ts.createProject({});
const tst = ts.createProject({});

gulp.task('compile', function() {
	return gulp.src('./src/main/*.ts').pipe(ts(tsv)).pipe(gulp.dest('./target/'));
});

gulp.task('test', ['compile'], function() {
	return gulp.src('./src/test/*.ts', { cwd: './target/' }).pipe(ts(tst)).pipe(jasmine());
});

gulp.task('clean', function() {
	return gulp.src('./target', {read: false}).pipe(clean());
});

