module.exports = function(grunt) {
 // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
        game_test: {
            src: 'public_html/js/source/*.js',          
            options: {
                specs: 'test/**/*.js',
                display: 'full',
//                host: 'http://localhost:8000',
                keepRunner:true,//so I have web to see
                tasks: 'jasmine:pivotal:build',
//                summary: false,
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {                   
                    requireConfigFile: 'public_html/js/source/main.js',
                    requireConfig:{
//                        waitSeconds:0,
                        baseUrl: 'public_html/js',
                        paths: {
                            source: 'source',
                            lib: '../lib'
                        }
                    }
                }
            }
        }
      },

    watch: {
        script_test: {
                options:{
                        interrupt: true,
                        reload: true,
                        atBegin: true
                },
                files:['public_html/js/source/*.js','test/*.js'],			
                tasks:['jasmine']
        },
        product:{
                files:['public_html/js/source/*.js'],
                tasks:['uglify']
        }
    },
    connect: {
        server: {
          options: {
            port: 8000,
            keepalive:true,
            protocol: "http",
            hostname:"localhost",
            index: 'index.html',
            base: 'public_html'
          }
        },
        server_test: {
          options: {
            port: 8000,
            keepalive:true,
            protocol: "http",
            hostname:"localhost",
            index: '_SpecRunner.html',
            base: './'
          }
        }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		mangle: false
      },
      dev: {//dynamically uglify all files
        files:[{
            expand: true,
            cwd: 'public_html/js/source',
            src: ['*.js'],//only this is relative to cwd
            dest: 'public_html/js/dis/',
            ext: '.min.js',
            extDot: 'first'
		}]//need to be array here
      },
      dev_stable: {
        options: {
                beautify: false,
                sourceMap: true,
                sourceMapName: 'public_html/js/dis/sourcemap.map'
          },
        files:{
            'public_html/js/dis/html5game.js':[
                                            'public_html/js/source/enum.js', 
                                            'public_html/js/source/util.js',
                                            'public_html/js/source/plate.js',
                                            'public_html/js/source/bullet.js',
                                            'public_html/js/source/gunner.js',
                                            'public_html/js/source/weaponFactory.js',
                                            'public_html/js/source/player.js',
                                            'public_html/js/source/game.js',
                                            'public_html/js/source/main.js'
                                            ]
		}
      }
    }
  });
  //load everything in devDependencies
	//require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-template-jasmine-requirejs');
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');//watch task
  
	// Default task(s).
       
  grunt.registerTask('default', ['watch']);//watch, if change, test
  grunt.registerTask('compress', ['uglify']);//dynamic uglify
  grunt.registerTask('compress_stable', ['uglify:dev_stable']);//static
  grunt.registerTask('test',['jasmine']);//test
  grunt.registerTask('server',['connect:server']);//create local server
  grunt.registerTask('server_test',['connect:server_test']);//create local server
};
