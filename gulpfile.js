/*eslint-env node */

var gulp = require('gulp');
var exec = require('child_process').exec;
var gls = require('gulp-live-server');
var sass = require('gulp-sass');
var mincss = require('gulp-cssmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('default', ['vendorcss', 'vendorjs', 'setupGtfsConfig'], function() {

});

gulp.task('serve', function() {
	var server = gls.new('server.js');
	exec('mongod');
	server.start();

	gulp.watch(['server/**/*.html'], function(file) {
		server.notify.apply(server, [file]);
	});
	gulp.watch(['public/**/*'], function(file) {
		server.notify.apply(server, [file]);
	});
	gulp.watch(['server/**/*.js'], function() {
		server.start.bind(server)();
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
	gulp.src('dev/css/transportinator/transportinator.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css/transportinator'))
		.pipe(mincss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('vendorjs', function() {
	gulp.src(['bower_components/jquery/dist/jquery.min.js', 'bower_components/angular/angular.min.js', 'bower_components/angular-ui-router/release/*.min.js', 'bower_components/angular-resource/*.min.js', 'bower_components/bootstrap/dist/js/*.min.js', 'bower_components/toastr/toastr.min.js', 'bower_components/underscore/underscore-min.js'])
		.pipe(concat('allVendors.js'))
		.pipe(gulp.dest('./public/js/vendor'));
});

gulp.task('js', function() {
	gulp.src(['./dev/js/eventinator/app.js', './dev/js/global/**/*.js', './dev/js/eventinator/**/*.js'])
		.pipe(concat('eventinator.js'))
		.pipe(gulp.dest('./dist/js/eventinator'))
		.pipe(uglify({
			compress: {
				sequences: false
			}
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./public/app'));
	gulp.src(['./dev/js/transportinator/app.js', './dev/js/transportinator/**/*.js'])
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('transportinator.js'))
		.pipe(gulp.dest('./dist/js/transportinator'))
		.pipe(uglify({
			compress: {
				sequences: false
			}
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./public/app'));
});

gulp.task('setupGtfsConfig', function() {
	gulp.src('./server/config/mtaConfig.js')
		.pipe(rename('config.js'))
		.pipe(gulp.dest('./node_modules/gtfs'));
});