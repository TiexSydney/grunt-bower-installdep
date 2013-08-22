'use strict';

var grunt = require('grunt');

exports.bower_installDep = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  bower_installDep: function (test) {
    test.expect(7);
    var expected = grunt.file.readJSON('test/expected/options.json');
    test.equal(typeof expected.targetDir, 'string', 'should be string type.');
    test.notEqual(expected.targetDir, '', "should not be an empty string");
    test.equal(typeof expected.bowerDir, 'string', 'should be string type.');
    test.notEqual(expected.bowerDir, '', "should not be an empty string");
    test.equal(typeof expected.cwd, 'string', 'should be string type.');
    test.notEqual(expected.cwd, '', "should not be an empty string");
    test.equal(typeof expected.unzip, 'boolean', 'should be boolean type.');
    test.done();
  }
};