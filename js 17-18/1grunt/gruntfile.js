module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
    // define a string to put between each file in the concatenated output
      separator: ';'
      },
      dist: {
      // the files to concatenate
       src: ['script/src/*.js'],
      // the location of the resulting JS file
       dest: 'script/build/js.main.js'
      }
    },
    concat_css: {
      options: {},
      all: {
        src: ["css/src/*.css"],
        dest: "css/build/style.css"
      },
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css/build',
          src: ['style.css'],
          dest: 'css/build',
          ext: '.min.css'
        }]
      }
    },    
    uglify: {
      dist: {
        src:['script/build/js.main.js'],
        dest: 'script/build/js.main.min.js' 
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['concat', 'uglify', 'concat_css', 'cssmin']);

};