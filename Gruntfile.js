
require('dotenv').config();

module.exports = function (grunt) {
    const email = process.env.SCREEPS_EMAIL;
    const token = process.env.SCREEPS_TOKEN;
    const branch = process.env.SCREEPS_BRANCH || 'default';

    if (!email || !token) {
        grunt.fail.fatal(
            'Missing SCREEPS_EMAIL or SCREEPS_TOKEN in .env'
        );
    }

    grunt.initConfig({
        screeps: {
            options: {
                email: email,
                token: token,
                branch: branch
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-screeps');
    grunt.registerTask('default', ['screeps']);
};
