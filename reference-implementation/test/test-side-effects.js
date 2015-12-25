const assert = require('assert');

const Logger = require('../Logger.js');

const sinon  = require('sinon');

describe('side effects', () => {

  afterEach(() => {
    function restore(f) {
      f.restore && f.restore();
    }

    restore(process.stdout.write);
    restore(process.stderr.write);
  });

  it('prints to stdout for log, warn and info', () => {
    const spy = sinon.spy(process.stdout, 'write');

    global.print('log', 'ente');
    assert.equal('ente\n', process.stdout.write.getCall(0).args[0]);

    global.print('info', 'hase');
    assert.equal('hase\n', process.stdout.write.getCall(1).args[0]);

    global.print('warn', 'gans');
    assert.equal('gans\n', process.stdout.write.getCall(2).args[0]);
  });

  it('prints to stderr for errors', () => {
    const spy = sinon.spy(process.stderr, 'write');
    global.print('error', 'ente');
    assert.equal('ente\n', process.stderr.write.getCall(0).args[0]);
  });

  it('separates arguments by a space', () => {
    const spy = sinon.spy(process.stdout, 'write');
    global.print('log', 'ente', 'gans');
    assert.equal('ente gans\n', process.stdout.write.getCall(0).args[0]);
  });

  it('is able to print JSON objects', () => {
    const spy = sinon.spy(process.stdout, 'write');
    global.print('log', 'ente', [{foo: 'bar'}]);
    assert.equal("ente [ { foo: 'bar' } ]\n", process.stdout.write.getCall(0).args[0]);
  });

  it('is able to print booleans', () => {
    const spy = sinon.spy(process.stdout, 'write');
    global.print('log', 'ente', false);
    assert.equal('ente false\n', process.stdout.write.getCall(0).args[0]);
  });

  it('is able to print undefined', () => {
    const spy = sinon.spy(process.stdout, 'write');
    global.print('log', 'ente', undefined);
    assert.equal('ente undefined\n', process.stdout.write.getCall(0).args[0]);
  });
});
