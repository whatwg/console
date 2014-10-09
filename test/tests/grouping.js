'use strict';
/* global describe, it */
var assert = require('assert');
var adapter = global.adapter;

describe('grouping methods', function() {
	['group', 'groupCollapse', 'groupEnd'].forEach(function(method) {
		describe(method, function() {
			it('should exist as a function', function() {
				assert.ok(adapter.hasOwnProperty(method));
				assert.ok(typeof adapter[method] === 'function');
			});
		});
	});
});
