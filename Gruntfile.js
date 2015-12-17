module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle:false
      },
      build: {
        src: [
          'app/assets/js/jquery-1.11.js',
          'app/assets/js/bbeditor.js',
          'app/assets/js/ui-bootstrap.js',
          'app/assets/js/ui-bootstrap-tpls.min.js',
          'app/*.js',
          'app/services/*.js',
          'app/controller/*.js',
          'app/assets/js/dirPagination.js',
          'app/bower_components/toastr/toastr.js',
          'app/bower_components/angular-pusher/angular-pusher.js',
          'app/assets/js/angular.sanitize.min.js',
          'app/bower_components/angular-ui-router/release/angular-ui-router.js',
          'app/bower_components/ng-file-upload/ng-file-upload.min.js'
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