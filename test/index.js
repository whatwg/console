'use strict';

var Mocha = require('mocha');
var path = require('path');
var fs = require('fs');
var defaults = require('lodash').defaults;

var testsDir = path.resolve(__dirname, 'tests');

module.exports = function(adapter, mochaOpts, cb) {
	if (typeof mochaOpts === 'function') {
		cb = mochaOpts;
		mochaOpts = {};
	}

	if (typeof cb !== 'function') {
		cb = function() {};
	}

	mochaOpts = defaults(mochaOpts, { timeout: 200, slow: Infinity });

	fs.readdir(testsDir, function(err, testFileNames) {
		if (err) {
			cb(err);
			return;
		}

		var mocha = new Mocha(mochaOpts);
		testFileNames.forEach(function(testFileName) {
			if (path.extname(testFileName) === '.js') {
				var testFilePath = path.resolve(testsDir, testFileName);
				mocha.add(testFilePath);
			}
		});

		global.adapter = adapter;
		mocha.run(function(failures) {
			delete global.adapter;
			if (failures > 0) {
				var err = new Error('Test suite failed with ' + failures + ' failures.');
				err.failures = failures;
				cb(err);
			} else {
				cb(null);
			}
		});
	});
};

module.exports.mocha = function(adapter) {
	global.adapter = adapter;

	require('./testFiles');

	delete global.adapter;
};
