'use strict';

var grunt = require('grunt');


exports.bower_installDep = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  bower_installDep: function (test) {
    test.expect(8);
    var expected = grunt.file.readJSON('test/expected/options_wrong.json');
    test.notEqual(typeof expected.targetDir, 'string', 'should not be string type.');
    test.notEqual(expected.targetDir, '', "should not be an empty string");
    test.notEqual(typeof expected.bowerDir, 'string', 'should not be string type.');
    test.notEqual(expected.bowerDir, '', "should not be an empty string");
    test.equal(typeof expected.cwd, 'string', 'should be string type.');
    test.equal(expected.cwd, '', "should be an empty string");
    test.notEqual(typeof expected.unzip, 'boolean', 'should not be boolean type.');
    test.equal(typeof expected.unzip, 'string', 'should be string type.');
    test.done();
  }
};