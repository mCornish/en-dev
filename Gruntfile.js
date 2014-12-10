module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
        unit: {
            configFile: 'test/karma.conf.js',
            background: true,
            singleRun: false
        }
    },
    jshint: {
        files: [
            'Gruntfile.js',
            'app/**/*.js',
            'test/**/*.js',
            'test/*js',
            '!test/libs/angular-mocks.js'
        ]
    },
    watch: {
        files: [
            'Gruntfile.js',
            'app/**/*.js',
            'test/**/*.js'
        ],
        tasks: ['karma', 'jshint'],
        karma: {
            files: ['app/**/*.js', 'test/**/*.js'],
            tasks: ['karma:unit:run']
        }
    },
    concat: {
        dist: {
            src: [
                'assets/lib/*.js',
                'app/**/*.js',
                'app/**/**/*.js',
                'app/app.js'
            ],
            dest: 'assets/js/prod.js'
        }
    },
    browserSync: {
        files: {
            src: 'assets/css/style.css'
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', []);

  // Custom tasks
  grunt.registerTask('test', ['karma:unit:run', 'jshint', 'watch']);

};
