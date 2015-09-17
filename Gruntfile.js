module.exports = function(grunt) {

    // constants for various paths and files to be used by the task configuration
    var BUILD_DIR      = 'dist/';

    var BUILD_DIR_JS   = BUILD_DIR     + 'js/';
    var BUILD_FILE_JS  = BUILD_DIR_JS  + 'script.js';

    var BUILD_DIR_CSS  = BUILD_DIR     + 'css/';
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

        cssflow: {
            options: {
                preprocessor: 'less',
                autoprefixer: [AP_BROWSERS]
            },
            build: {
                files: {
                    'src/css/style.css': 'src/less/style.less'
                }
            }
        },

        copy: {
            build: {
                cwd: SRC_DIR_CSS,
                src: ['*.min.css'],
                dest: BUILD_DIR_CSS,
                expand: true
            }
        },

        less: {
            build: {
                files: {
                    'src/css/style.css': SRC_FILES_LESS
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: [AP_BROWSERS]
            },
            build: {
                files: {
                    expand: true,
                    src: 'src/css/style.css',
                    dest: 'src/css/style.css'
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

        jshint: {
            options: {
                curly: true
            },
            beforeconcat: [SRC_FILES_JS],
            afterconcat: ['dist/js/script.js']
        },

        concat: {
            options: {
                seperator: ";"
            },
            build: {
                src: ['src/js/*.js'],
                dest: 'dist/js/script.js'
            }
        },

        uglify: {
            build: {
                files: {
                    "dist/js/script.min.js": 'dist/js/script.js'
                }
            }
        },

        watch: {
            styles: {
                options: {
                    spawn: false
                },
                files: ['src/less//*.less'],
                tasks: ['cssflow', 'copy'],
            },
            scripts: {
                options: {
                    spawn: false
                },
                files: ['src/js//*.js'],
                tasks: ['concat', 'uglify', 'jshint']
            }
        }
    });

    // Load the plugins
    require('load-grunt-tasks')(grunt);

    //Default Task(s)
    grunt.registerTask('default', 'watch');
};
