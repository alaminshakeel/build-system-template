module.exports = function(grunt) {

    // constants for various paths and files to be used by the tast configuration
    var BUILD_DIR      = 'dist/';

    var BUILD_DIR_JS   = BUILD_DIR     + 'assets/js/';
    var BUILD_FILE_JS  = BUILD_DIR_JS  + 'script.min.js';

    var BUILD_DIR_CSS  = BUILD_DIR     + 'assets/css/';
    var BUILD_FILE_CSS = BUILD_DIR_CSS + 'style.min.css';


    var SRC_DIR        = 'src/';

    var SRC_DIR_JS     = SRC_DIR + 'js/';
    var SRC_DIR_CSS    = SRC_DIR + 'css/';
    var SRC_DIR_LESS   = SRC_DIR + 'less/';

    var SRC_FILES_JS   = SRC_DIR_JS   + '*.js';
    var SRC_FILES_CSS  = SRC_DIR_CSS  + '*.css';
    var SRC_FILES_LESS = SRC_DIR_LESS + '*.less';

    var AP_BROWSERS = [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24',
        'Explorer >= 8',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            build: {
                files: {
                    'src/css/style.css': SRC_FILES_LESS
                }
            }
        },

        cssmin: {
            build: {
                files: {
                    'dist/css/style.min.css': SRC_FILES_CSS
                }
            }
        },

        uglify: {
            build: {
                files: {
                    "dist/js/script.min.js": SRC_FILES_JS
                }
            }
        },

        watch: {
            files: ['src/css//*.css', 'src/less//*.less'],
            tasks: ['less', 'cssmin'],

            script: {
                files: ['src/js//*.js'],
                tasks: 'uglify'
            }
        }
    });

    // Load the plugins
    require('load-grunt-tasks')(grunt);

    //Default Task(s)
    grunt.registerTask('default', 'watch');
};
