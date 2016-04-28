const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const merge = require('merge-stream');
const runSequence = require('run-sequence');
const util = require('gulp-util');

const fail = function() {
	util.log("A component which does not force fail, failed.")
	process.exit(1);
}

const tsv = ts.createProject({
	noEmitOnError: true
});
const tst = ts.createProject({
	noEmitOnError: true
});

gulp.task('compile', ['clean'], function() {
	const jsorig = gulp.src('./src/main/js/*.js');
	const tstojs = gulp.src('./src/main/ts/*.ts').pipe(ts(tsv)).on('error', fail);
	const js     = merge(tstojs, jsorig).pipe(gulp.dest('./target/js/'));
	const css    = gulp.src('./src/main/css/*.css').pipe(gulp.dest('./target/css/'));
	const resour = gulp.src('./src/main/resources/**').pipe(gulp.dest('./target/'));
	const movmnf = gulp.src('./manifest.json').pipe(gulp.dest('./target/'));
	return merge(js, css, movmnf, resour);
});

gulp.task('compiletest', ['compile'], function() {
	const jsorig = gulp.src('./src/test/*.js');
	const tstojs = gulp.src('./src/test/*.ts').pipe(ts(tsv)).on('error', fail);
	return merge(tstojs, jsorig).pipe(gulp.dest('./target/test/js/'));
})

gulp.task('test', ['compiletest'], function() {
	return gulp.src('./target/test/js/*.js').pipe(jasmine());
});

gulp.task('build', function() {
	return runSequence('test', 'compile');
});

gulp.task('clean', function() {
	return gulp.src(['./target', './dest'], {read: false}).pipe(clean());
});

