/*
 * grunt-bower-installDep
 *
 *
 * Copyright (c) 2013 Dem-Jau
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'tasks/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Configuration to be run (and then tested).
    bower_installDep: {
      target: {
        targetDir: "Libraries",
        bowerDir: "Bower-Dependencies",
        cwd: "target",
        unzip: false
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']

    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['bower_installDep', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'bower_installDep']);

};