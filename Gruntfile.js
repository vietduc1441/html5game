module.exports = function(grunt) {
 // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	jasmine: {
		pivotal: {
		  src: 'public_html/lib/*.js',
		  options: {
			specs: 'test/*.js',
			display: 'full'
		  }
		}
	  },

	watch: {
		script_test: {
			files:['public_html/js/src/*.js','test/*.js'],			
			tasks:['jasmine']
		},
		dev:{
			options:{
				interrupt: true,
				reload: true
			},
			files:['public_html/js/src/*.js'],
			tasks:['uglify']
		}
	},
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		mangle: true
      },
      dev: {
		options: {
			beautify: false,
			sourceMap: true,
			sourceMapName: 'public_html/js/dis/sourcemap.map'
		  },
        files:{
			'public_html/js/dis/html5game.js':[
											'public_html/js/src/enum.js', 
											'public_html/js/src/util.js',
											'public_html/js/src/plate.js',
											'public_html/js/src/bullet.js',
											'public_html/js/src/gunner.js',
											'public_html/js/src/weaponFactory.js',
											'public_html/js/src/player.js',
											'public_html/js/src/game.js',
											'public_html/js/src/main.js'
											]
		}
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');//watch task
	// Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('compress', ['uglify']);
  grunt.registerTask('test',['jasmine']);
};
//http://badwing.com/my-gruntfile-js-an-example-gruntfile-and-my-workflow/