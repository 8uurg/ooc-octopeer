const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');

const tsv = ts.createProject({});
const tst = ts.createProject({});

gulp.task('compile', ['clean'], function() {
	//gulp.src(['./src/main/js/*.js', './src/test/*.js']).pipe(gulp.dest('./target/'));
	return gulp.src(['./src/main/ts/*.ts', './src/test/ts/*.ts']).pipe(ts(tsv)).pipe(gulp.dest('./target/'));
});

gulp.task('test', ['compile'], function() {
	return gulp.src('./src/test/*.js').pipe(jasmine());
});

gulp.task('clean', function() {
	return gulp.src('./target', {read: false}).pipe(clean());
});

