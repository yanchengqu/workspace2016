// 包装函数
module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	// 任务配置
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			build: {
				src: 'js/*.js',
				dest: 'build/site.min.js'
			}
		},
		concat: {
			build: {
				files: { 	
					'build/test.js': ['js/site.js', 'js/detail.js']
				}
			}
		},
		connect: {
			options: {
				port: 9000,
				//hostname: 'localhost',
				hostname: '192.168.1.142',
				livereload: 35729,
			},
			proxies : [{
                context      : '/api',
                host         : 'm.ehaier.mobile',
                port         : 80,
                https        : false,
                changeOrigin : true,
                rewrite : {
                    '/api' : '/api/mobile/itemindex/'
                }
            }],	
			livereload : {
                options: {
                    open : true,
                    base : [
                        'html', '.'
                    ],

                    middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        // Serve static files.
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }

                }
            }	
		},

		watch: {
			livereload: {
				options: {
					livereload: '<%=connect.options.livereload %>'
				},
				files: [
					'html/*.html',
					'css/**/*.css',
					'js/**/*.js',
					'images/**/*'
				]
			}
		
		}
  });

	// 任务加载
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-concat');
	
	grunt.registerTask('serve', ['configureProxies:livereload', 'connect:livereload', 'watch'])

	// 自定义任务
	grunt.registerTask('default', ['uglify']);

};
