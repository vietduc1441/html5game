module.exports = function(grunt) {
 // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		mangle: true
      },
      my_target: {
        files:{
			'public_html/js/html5game.js':['public_html/js/enum.js', 
											'public_html/js/util.js',
											'public_html/js/plate.js',
											'public_html/js/bullet.js',
											'public_html/js/gunner.js',
											'public_html/js/weaponFactory.js',
											'public_html/js/player.js',
											'public_html/js/game.js',
											'public_html/js/main.js'
											]
		}
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
// Default task(s).
  grunt.registerTask('default', ['uglify']);

};