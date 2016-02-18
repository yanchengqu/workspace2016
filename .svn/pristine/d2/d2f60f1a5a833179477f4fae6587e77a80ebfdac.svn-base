/**
 * @author: u9648u6653u52c7@gmail.com
 * @date: 2015-06-25
 * @description: FES Build 
 *
 */

var 
	gulp    = require('gulp'),
	connect = require('gulp-connect');

gulp.task('server', function() {
	connect.server({
		livereload: true
	});
});

gulp.task('livereload',function() {
	return gulp.src('./**/*.{html,css,js}')
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('./**/*.{html,css,js}', ['livereload']);
});

gulp.task('i',function(){ connect.server({})});

gulp.task('default', ['server', 'watch']);