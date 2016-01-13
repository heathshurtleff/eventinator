/*eslint-env node */

var gulp = require('gulp');
var gls = require('gulp-live-server');
var sass = require('gulp-sass');
var mincss = require('gulp-cssmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', ['vendorcss', 'vendorjs'], function() {
	
});

gulp.task('serve', function() {
	var server = gls.new('server.js');
	server.start();

	gulp.watch(['server/**/*.html'], function(file) {
		server.notify.apply(server, [file]);
	});
	gulp.watch(['public/**/*'], function(file) {
		server.notify.apply(server, [file]);
	});
	gulp.watch(['myapp.js', 'server/**/*.js'], function() {
		server.start.bind(server);
	});
	gulp.watch(['dev/css/**/*.scss'], ['sass'], function() {});
	gulp.watch(['dev/js/**/*.js'], ['js'], function() {});
});

gulp.task('vendorcss', function() {
	gulp.src('./bower_components/bootstrap/dist/css/*.min.css')
		.pipe(gulp.dest('./public/css/vendor'));
	gulp.src('./bower_components/bootstrap/dist/fonts/*')
		.pipe(gulp.dest('./public/css/fonts'));
});

gulp.task('sass', function() {
	gulp.src('dev/css/eventinator/eventinator.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css/eventinator'))
		.pipe(mincss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('vendorjs', function() {
	gulp.src(['bower_components/angular/*.min.*', 'bower_components/angular-ui-router/release/*.min.js', 'bower_components/jquery/dist/*.min.*'])
		.pipe(gulp.dest('./public/js/vendor'));
});

gulp.task('js', function() {
	gulp.src('./dev/js/eventinator/*.js')
		.pipe(concat('eventinator.js'))
		.pipe(gulp.dest('./dist/js/eventinator'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./public/js'));
});