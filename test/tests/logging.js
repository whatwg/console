'use strict';
/* global describe, it */
var assert = require('assert');
var adapter = global.adapter;

describe('logging methods', function() {
	['debug', 'log', 'error', 'info', 'log', 'trace', 'warn'].forEach(function(method) {
		describe(method, function() {
			it('should exist as a function', function() {
				assert.ok(adapter.hasOwnProperty(method));
				assert.ok(typeof adapter[method] === 'function');
			});

			it('should be callable with a string', function() {
				assert.doesNotThrow(function() {
					adapter[method]('This is a string');
				});
			});

			it('should be callable with an array', function() {
				assert.doesNotThrow(function() {
					adapter[method]([1, 2, 3]);
				});
			});

			it('should be callable with an object', function() {
				assert.doesNotThrow(function() {
					adapter[method]({name: 'barney', age: 36, employer: 'slate'});
				});
			});

			it('should allow multiple parameters', function() {
				assert.doesNotThrow(function() {
					adapter[method]('one', 'two', 'three');
				});
			});

			it('should allow multiple parameters of differing types', function() {
				assert.doesNotThrow(function() {
					adapter[method]('one', 2, {three: true});
				});
			});
		});
	});

	describe('table', function() {
		var characters = [
			{name: 'barney', age: 36, employer: 'slate'},
			{name: 'fred', age: 40, employer: 'slate'},
			{name: 'pebbles', age: 1, employer: 'n/a'}
		];

		it('should exist as a function', function() {
			assert.ok(adapter.hasOwnProperty('table'));
			assert.ok(typeof adapter.table === 'function');
		});

		it('should be callable with an array of objects', function() {
			assert.doesNotThrow(function() {
				adapter.table(characters);
			});
		});

		it('should be callable with an array of objects and array of columns', function() {
			assert.doesNotThrow(function() {
				adapter.table(characters, ['name', 'age']);
			});
		});
	});

	describe('count', function() {
		it('should exist as a function', function() {
			assert.ok(adapter.hasOwnProperty('count'));
			assert.ok(typeof adapter.count === 'function');
		});

		it('should count labels', function() {
			assert.doesNotThrow(function() {
				adapter.count('test');
				adapter.count('cat');
				adapter.count('dog');
				adapter.count('test');
				adapter.count('test');
			});
		});
	});

	describe('clear', function() {
		it('should exist as a function', function() {
			assert.ok(adapter.hasOwnProperty('clear'));
			assert.ok(typeof adapter.clear === 'function');
		});

		it('should clear, I guess', function() {
			assert.doesNotThrow(function() {
				adapter.clear();
			});
		});
	});

	describe('assert', function() {
		it('should exist as a function', function() {
			assert.ok(adapter.hasOwnProperty('assert'));
			assert.ok(typeof adapter.assert === 'function');
		});

		it('should throw an exception if an assertion fails', function() {
			assert.throws(function() {
				adapter.assert(false, 'should fail');
			}, /should fail/);
		});
	});
});
