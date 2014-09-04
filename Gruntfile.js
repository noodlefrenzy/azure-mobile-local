module.exports = function(grunt) {
    grunt.initConfig({
        simplemocha: {
            options: {
              globals: ['should'],
              timeout: 3000,
              ignoreLeaks: false,
              ui: 'bdd',
              reporter: 'list',
            },
            all: { src: ['test/**/*.js'] }
        },

        jshint: {
            all: [ 'Gruntfile.js', '../service/**/*.js']
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('test', ['simplemocha']);

    grunt.registerTask('build', ['jshint', 'test']);

    grunt.registerTask('default', function() {
        var w = grunt.log.writeln;
        w("");
        w("Building the API:");
        w("  Azure Mobile Services keep their own Git repository, which allows pushes to auto-deploy.");
        w("  This Gruntfile helps test local changes, and then sync and deploy those changes with that repository.");
        w("");
    });
};
