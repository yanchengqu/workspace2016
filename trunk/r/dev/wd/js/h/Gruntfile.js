// 包装函数
module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	// 任务配置
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {

		},
		concat: {
			hjs: {
				src: [
				  "src/h.js",
				  "src/h.cookie.js",
				  "src/h.ua.js",
				  "src/h.event.js",
				  "src/h.template.js",
				  "src/h.lazyload.js",
				  "src/h.common.js"
				],
				dest: "dist/h.js"
			}

		}
  });

	// 自定义任务
	grunt.registerTask('default', ['concat']);

};
