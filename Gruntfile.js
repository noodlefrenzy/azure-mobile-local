module.exports = function(grunt) {
    grunt.initConfig({
        alt_src_dir: 'azuremobileservice/servicename',
        alt_src_url: 'https://noodlefrenzy.scm.azure-mobile.net/noodlefrenzy.git',

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
            all: [ 'Gruntfile.js', '<%= alt_src_dir %>/service/**/*.js']
        },

        shell: {
            submoduleInit: {
                command: 'git submodule update --init --recursive',
            },
            submoduleBranchMaster: {
                command: 'git checkout master',
                options: {
                    execOptions: {
                        cwd: '<%= alt_src_dir %>'
                    }
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('init', ['shell:submoduleInit', 'shell:submoduleBranchMaster']);

    grunt.registerTask('test', ['simplemocha']);

    grunt.registerTask('build', ['jshint', 'test']);

    grunt.registerTask('default', function() {
        var w = grunt.log.writeln;
        w("");
        w("Building the API:");
        w("  Azure Mobile Services keep their own Git repository, which allows pushes to auto-deploy.");
        w("  This Gruntfile helps test local changes, and then sync and deploy those changes with that repository.");
        w("");
        w("To get started:");
        w("  grunt init: The Azure Mobile Services git repository is maintained as a git submodule located at ./azuremobileservice/_servicename_");
        w("  grunt build: Runs Lint and Mocha tests on the local codebase.");
        w("");
        w("NOTE: For some reason, there are some issues accepting input - when you see a username/password prompt, HIT RETURN FIRST");
        w(" This will then allow you to enter your input on the next line.  If your password echoes back to you, you're doing it wrong :)");
        w("");
    });
};
