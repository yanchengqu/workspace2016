/**
 * @author: chenxiaoyong@ehaier.com
 * @date: 2014-12-28
 * @description: FES Build 
 *
 */

// node module
var exec        = require('child_process').exec,
	path        = require('path'), 
	os          = require('os'),
	httpProxy   = require('http-proxy'),
	connect     = require('connect'),
	serveStatic = require('serve-static'),
	vhost       = require('vhost');

// gulp plugins
var gulp		 = require('gulp'),
	gutil        = require('gulp-util'),
	header       = require('gulp-header'),
	jshint       = require('gulp-jshint'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify'),
	minifycss    = require('gulp-minify-css'),
	csslint      = require('gulp-csslint'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	minifyhtml   = require('gulp-minify-html'),
	sourcemaps   = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	del          = require('del'),
	rev          = require('gulp-rev'),
	rename       = require('gulp-rename'),
	notify       = require('gulp-notify'),
	newer        = require('gulp-newer'),
	cached       = require('gulp-cached'),
	changed      = require('gulp-changed'),
	remember     = require('gulp-remember'),
	gconnect     = require('gulp-connect'),
	zip          = require('gulp-zip'),
	tar          = require('gulp-tar'),
	gzip         = require('gulp-gzip'),
	ftp          = require('gulp-ftp'),
	sftp         = require('gulp-sftp');

var isBranchDirectory = __dirname.indexOf('branches') > 0 ? true : false;
var paths = {
		dev: {
			js:  'dev/**/*.js',
			css: 'dev/**/*.css',
			tpl: 'dev/**/*.{html,tpl}',
			img: 'dev/**/*{jpg,png,gif,svg}',
			html: !isBranchDirectory ? '../../pages/**/*.html' : '../../../pages/**/*.html',
		},
		source: 'dev/',
		build : 'build/',
		package: '.tmp/',
		livereload: {
			root: !isBranchDirectory ? '../../pages/' : '../../../pages/'
		}
	};

/* Business */

gulp.task('styles', function(){
	return gulp.src(paths.dev.css, {base: paths.source})
		// .pipe(rename({suffix: '.min'}))
		// .pipe(rev())
		.pipe(newer(paths.build))
		.pipe(csslint())
    	.pipe(csslint.reporter())
		.pipe(minifycss({
			compatibility: 'ie7'
		}))		
		.pipe(gulp.dest(paths.build))
		.pipe(gulp.dest(paths.package))
		.pipe(notify('CSS文件压缩完成!'));
});

gulp.task('scripts', function(){
	return gulp.src(paths.dev.js, {base: paths.source})
		// .pipe(sourcemaps.init())
		// .pipe(rename({suffix: '.min'}))
		// .pipe(rev())
		.pipe(newer(paths.build))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		// .pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.build))
		.pipe(gulp.dest(paths.package))
		.pipe(notify('JS文件压缩完成!'));
});

gulp.task('tpls', function(){
	return gulp.src(paths.dev.tpl, {base: paths.source})
		.pipe(newer(paths.build))
		.pipe(minifyhtml({
			comments: true,
			spare: true
		}))
		.pipe(gulp.dest(paths.build))
		.pipe(gulp.dest(paths.package))
		.pipe(notify('模板文件压缩完成!'));
});

gulp.task('imgs', function(){
	return gulp.src(paths.dev.img, {base: paths.source})
		.pipe(newer(paths.build))
		.pipe(imagemin({
			progressive: true,
			interlaced : true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest(paths.build))
		.pipe(gulp.dest(paths.package))
		.pipe(notify('图片文件压缩完成!'));
});


/* Core */

/* Static Server && Livereload */

// gulp.task('static', function(){
// 	gconnect.server({
// 		host: 'static.ehaier.com',
// 		port: 80
// 	});
// });

gulp.task('static', function(){
	var hosts = /static.tongshuai.com|fes.debug/;
	var	staticServer = connect()
			.use(serveStatic(path.join(__dirname,'..')))
			.use(serveStatic(paths.livereload.root));
	var	 proxySever = httpProxy.createProxyServer();

	// 代理服务报错处理，否则整个系统会挂掉
	proxySever.on('error', function (err, req, res) {
	    res.end();
	});
	
	var vhostApp = connect()
		.use(vhost(hosts, staticServer))
		.use('/mobile', function(req, res, next) {
			proxySever.web(req, res, {target: 'http://192.168.9.30:8084/mobile/'});
		});
	vhostApp.listen(80);
	vhostApp.listen(9000);
	console.log('静态资源服务器创建完毕。')
});

gulp.task('serve', function(){
	gconnect.server({
		root: paths.livereload.root,
		livereload: {
			port: 35728
		}
		// livereload: true
	});
	exec('start http://localhost:8080');
});

gulp.task('livereload', function(){
	return gulp.src([paths.dev.js, paths.dev.css 
		,paths.dev.tpl, paths.dev.img, paths.dev.html])
		.pipe(gconnect.reload());
});

/* Watch */

gulp.task('watch',function(){
	gulp.watch([paths.dev.js, paths.dev.css, paths.dev.tpl, 
		paths.dev.img, paths.dev.html], ['livereload']);
	gulp.watch(paths.dev.js,  ['scripts']);
	gulp.watch(paths.dev.css, ['styles']);
	gulp.watch(paths.dev.tpl, ['tpls']);
	gulp.watch(paths.dev.img, ['imgs']);
});

/* Publish && Deploy */

gulp.task('package', function() {
	var filename =  os.hostname() + (+new Date()) + '.tar';
	return gulp.src(paths.package + '**/*')
			// .pipe(tar(packageName))
			.pipe(zip(filename))
			.pipe(gulp.dest('.'))
        	.pipe(notify('打包工作完成！'));
});


// gulp.task('publish', function() {
// 	var packageName =  os.hostname() + (+new Date()) + '.tar';
// 	return gulp.src('build/**/*')
// 			// .pipe(tar(packageName))
// 			.pipe(zip(packageName))
// 			.pipe(gulp.dest('.'))
// 			.pipe(notify('打包完成！'))
// 			// .pipe(ftp({
//    //          	host: 'uuu.site50.net',
//    //          	user: 'a4976906',
//    //          	pass: 'cxy1987914',
//    //          	remotePath: '/public_html'
//    //      	}))
// 			// .pipe(sftp({
//    //          	host: '211.151.171.71',
//    //          	user: 'external',
//    //          	pass: 'cfds0920',
//    //          	remotePath: '/wuhaiqing/haier/static'
//    //      	}))
//         	.pipe(notify('测试环境发布完成！'));
// });

// gulp.task('deploy', function() {
	
// });

/* Base Tasks */
gulp.task('clean', function(cb){del([paths.package], cb);});
gulp.task('minify', ['styles', 'scripts', 'tpls', 'imgs']);
gulp.task('default', ['static', 'serve', 'watch']);


