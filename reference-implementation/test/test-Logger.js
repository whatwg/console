const assert = require('assert');

const Logger = require('../Logger.js');

describe('Logger', () => {
  const oldPrint = global.print;

  afterEach(() => {
    global.print = oldPrint;
  });

  it('does not print with no data provided', () => {
    global.print = function print() {
      throw new Error('print called');
    };

    Logger('log');
  });

  it('does print falsy values', () => {
    global.print = function print(logLevel, a) {
      assert.equal(false, a[0]);
    };

    Logger('log', false);
  });

});
