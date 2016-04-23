const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const merge = require('merge-stream');
const runSequence = require('run-sequence');


const tsv = ts.createProject({});
const tst = ts.createProject({});

gulp.task('compile', ['clean'], function() {
	const jsorig = gulp.src('./src/main/js/*.js');
	const tstojs = gulp.src('./src/main/ts/*.ts').pipe(ts(tsv));
	const js     = merge(tstojs, jsorig).pipe(gulp.dest('./target/js/'));
	const resour = gulp.src('./src/main/resources/**').pipe(gulp.dest('./target/'));
	const movmnf = gulp.src('./manifest.json').pipe(gulp.dest('./target/'));
	return merge(js, movmnf, resour);
});

gulp.task('compiletest', ['compile'], function() {
	const jsorig = gulp.src('./src/test/*.js');
	const tstojs = gulp.src('./src/test/*.ts').pipe(ts(tsv));
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

