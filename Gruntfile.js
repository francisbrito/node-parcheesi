module.exports = function (grunt) {
    grunt.initConfig({
        dir: {
            base: '.',
            test: '<%= dir.base %>/test'
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: [
                    '<%= dir.test %>/**/*.js'
                ]
            }
        }
    });
    // Loads all grunt tasks.
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('test', ['mochaTest:test']);
    grunt.registerTask('default', ['test']);
};
