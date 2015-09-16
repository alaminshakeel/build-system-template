module.exports = function(grunt) {

    // constants for various paths and files to be used by the tast configuration
    var BUILD_DIR      = 'dist/';
    var BUILD_DIR_JS   = BUILD_DIR + 'assets/js/';
    var BUILD_DIR_CSS  = BUILD_DIR + 'assets/css/';

    var SRC_DIR        = 'src/';

    var SRC_DIR_JS     = SRC_DIR + 'js/';
    var SRC_DIR_CSS    = SRC_DIR + 'css/';
    var SRC_DIR_LESS   = SRC_DIR + 'less/';

    var SRC_FILES_JS   = SRC_DIR_JS + '*.js';
    var SRC_FILES_CSS  = SRC_DIR_CSS + '*.css';
    var SRC_FILES_LESS = SRC_DIR_LESS + '*.less';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            build: {
                files: {
                    "dist/js/script.min.js": SRC_FILES_JS
                }
            }
        },

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
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Default Task(s)
    grunt.registerTask('default', ['uglify', 'less', 'cssmin']);
};
