// Karma configuration
// Generated on Thu Dec 04 2014 09:32:34 GMT-0500 (EST)

module.exports = function(config) {
    config.set({

        basePath: '/Users/jlevine/jonathan.levine_john_6637/jonathan.levine_john_6637/enwservices/tomcat/dist/apache-tomcat-6.0.18/webapps/enwdev',

        frameworks: ['jasmine'],

        files: [
            'assets/lib/angular.js',
            'assets/lib/angular-route.js',
            'app/**/*.js',
            'test/libs/angular-mocks.js',
            'test/**/*.js'
        ],

        exclude: [
            'assets/libs/*.min.js',
            'assets/libs/modernizr.js'
        ],

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ]
    });
};
