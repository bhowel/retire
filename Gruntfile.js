/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
      
    // Task configuration.  

    // JSHint
    jshint: {
      gruntfile: {
        src: 'Gruntfile.js'
      },
			files: ['js/main.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: { "$": false }
      }
    },

    // Uglify
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'js/main.min.js': 'js/main.js'
        }
      }
    },
        		
		// SASS
		sass: {
			dist: {
				options: {
				  style: 'compressed'
				},			
				files: {
					'css/custom.min.css': 'css/custom.scss'
				}
			}
		},

		// Copy. Could not get this to work on images.
		copy: {
		  main: {
		   files: [
  		  { expand: true, src: 'js/*.min.js', dest: 'dist/', },
  		  { expand: true, src: 'css/*.min.css', dest: 'dist/', },
  		  { expand: true, src: '*.html', dest: 'dist/', },
  		  { expand: true, src: '*.ico', dest: 'dist/', }
		   ],
		  },
		},
        
    // Watch
    watch: {

      // gruntfile: jshint
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },

      // js: jshint, uglify, copy
      js: {
				files: 'js/main.js',
        tasks: ['jshint', 'uglify', 'copy']
      },  		

			// css: sass
      css: {
				files: 'css/**/*.scss',
        tasks: ['sass']
      },  

			// Copy: css, html, ico
      mincss: { files: 'css/*.min.css', tasks: ['copy'] },
      html: { files: '*.html', tasks: ['copy'] },       	
      ico: { files: '*.ico', tasks: ['copy'] }
      			            			      
    }
      				   
  });

  // Load plugins.
  grunt.loadNpmTasks( 'grunt-contrib-jshint' ); 
  grunt.loadNpmTasks( 'grunt-contrib-uglify' ); 
  grunt.loadNpmTasks( 'grunt-contrib-sass' ); 
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );

  // Default task.
  grunt.registerTask( 'default', 'watch' );   

};
