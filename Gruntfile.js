module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle:false
      },
      build: {
        src: [
          'app/assets/js/bbeditor.js',
          'app/*.js',
          'app/services/*.js',
          'app/controller/*.js',
          /*'app/bower_components/angular/angular.min.js',
          'app/bower_components/angular-ui-router/release/angular-ui-router.js',
          'app/bower_components/normalize.css/normalize.css',*/

        ],
        dest: 'app/build/build.min.js'
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'app/assets/css',
          src: ['*.css', '!*.min.css'],
          dest: 'app/assets/css',
          ext: '.min.css'
        },
        {
          'app/assets/css/final.min.css':['app/assets/css/*.min.css']
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ["uglify","cssmin"]);
};