/*
 * grunt-bower-installDep
 *
 *
 * Copyright (c) 2013 Dem-Jau
 * Licensed under the MIT license.
 */

'use strict';

var path = require("path"),
  AdmZip = require('adm-zip');

module.exports = function (grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('bower_installDep', 'The best Grunt plugin ever.', function () {

    var options = {
      cmd: "bower",
      args: ["install"],
      opts: {
        cwd: this.data.cwd
      }
    };

    var spawn = grunt.util.spawn,
      done = this.async(),
      that = this;

    spawn(options, function (error, result, code) {

      if (error) {
        grunt.log.writeln("ERROR: " + error);
        grunt.log.writeln("RESULT: " + result);
        grunt.log.writeln("CODE: " + code);
      } else if (that.data.cwd !== undefined && that.data.bowerDir !== undefined && that.data.targetDir !== undefined) {

        var origin = path.join(that.data.cwd, that.data.bowerDir), // The libraries will be here after bower install
          destination = path.join(that.data.cwd, that.data.targetDir), // Where we want the libraries
          libs = grunt.file.expand(origin + "/*/"), // Selects all the libraries
          bower, libname, libpath, i, j, src, dst, zip; // Some extra variables

        for (i = 0; i < libs.length; i++) {
          // Normalize the path (libs[i]), split it according the separator (path.sep) and take the name
          libname = path.normalize(libs[i]).split(path.sep)[2]; // (target/Bower-Dependencies/libname/).split("/") = [target, Bower-Dependencies, libname]
          libpath = path.normalize(libs[i]); //path.join(origin, libname); // Library path

          if (grunt.file.isFile(path.join(libpath, "bower.json"))) {
            bower = grunt.file.readJSON(path.join(libpath, "bower.json")); // bower.json
            if (bower.main !== undefined) {
              // Copy the main file(s)
              if (bower.main instanceof Array) {
                // If main is an Array
                for (j = 0; j < bower.main.length; j++) {
                  src = path.join(origin, libname, bower.main[j]);
                  if (path.extname(src) === ".zip") {
                    zip = new AdmZip(src);
                    dst = destination;
                    zip.extractAllTo(dst, true); // Extract and overwrite
                  } else {
                    dst = path.join(destination, libname, path.basename(bower.main[j]));
                    grunt.file.copy(src, dst);
                  }
                }
              } else {
                // If main is a single file
                src = path.join(origin, libname, bower.main);
                if (path.extname(src) === ".zip") {
                  zip = new AdmZip(src);
                  dst = destination;
                  zip.extractAllTo(dst, true); // Extract and overwrite
                } else {
                  dst = path.join(destination, libname, path.basename(bower.main));
                  grunt.file.copy(src, dst);
                }
              }
            } else {
              // copy the whole folder
              grunt.file.recurse(libpath, function (abspath, rootdir, subdir, filename) {
                dst = path.join(destination, libname, subdir || '', filename);
                grunt.file.copy(abspath, dst);
              });
            }
          } else {
            // copy the whole folder
            grunt.file.recurse(libpath, function (abspath, rootdir, subdir, filename) {
              dst = path.join(destination, libname, subdir || '', filename);
              grunt.file.copy(abspath, dst);
            });
          }
        }
        done(1);
      }

    });
  });

};