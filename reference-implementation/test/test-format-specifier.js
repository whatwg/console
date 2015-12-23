const assert = require('assert');

const Logger = require('../Logger.js');

describe('maybeApplyFormatSpecifier', () => {
  const maf = Logger.maybeApplyFormatSpecifier;

  it('does not apply formatters, just one argument given', () => {

    const res = maf(['rocko artischocko %s']);
    assert.equal('rocko artischocko %s', res);
  });

  it('doesnt interpolate the string, if no format specifier given', () => {

    const res = maf(['rocko artischocko dances', 'wooo oooh ooh ooh']);
    assert.equal('rocko artischocko dances', res[0]);
    assert.equal('wooo oooh ooh ooh', res[1]);
  });

  it('doesnt interpolate the string, if no format specifier given', () => {

    const res = maf(['rocko artischocko dances', 'wooo oooh ooh ooh']);
    assert.equal('rocko artischocko dances', res[0]);
    assert.equal('wooo oooh ooh ooh', res[1]);
  });

  it('interpolates a string', () => {

    const res = maf(['rocko artischocko dances %s', 'wooo oooh ooh ooh']);
    assert.equal('rocko artischocko dances wooo oooh ooh ooh', res[0]);
    assert.equal(undefined, res[1]);
  });

  it('interpolates a string with multiple format specifiers', () => {

    const res = maf(['rocko artischocko dances %s and %s', 'tango', 'samba']);
    assert.equal('rocko artischocko dances tango and samba', res[0]);
    assert.equal(undefined, res[1]);
  });

  it('interpolates a string leaves formatters if not enough args given', () => {

    const res = maf(['rocko artischocko dances %s and %s', 'tango']);
    assert.equal('rocko artischocko dances tango and %s', res[0]);
    assert.equal(undefined, res[1]);
  });

  it('handles edge cases like %% and %!', () => {

    const res = maf(['rocko artischocko%% dances %%%s and %! %s', 'tango', 'samba']);
    assert.equal('rocko artischocko%% dances %%tango and %! samba', res[0]);
    assert.equal(undefined, res[1]);
  });

  describe('integer conversion', () => {

    it('applies a conversion to the desired format for integers, integer given', () => {

      const res = maf(['bjoern and robert are born on the %dst dec', 21]);
      assert.equal('bjoern and robert are born on the 21st dec', res[0]);
      assert.equal(undefined, res[1]);
    });

    it('applies a conversion to the desired format for integers, null given', () => {

      const res = maf(['bjoern and robert are born on the %dst dec', null]);
      assert.equal('bjoern and robert are born on the NaNst dec', res[0]);
      assert.equal(undefined, res[1]);
    });

    it('applies a conversion to the desired format for integers, false given', () => {

      const res = maf(['bjoern and robert are born on the %dst dec', false]);
      assert.equal('bjoern and robert are born on the NaNst dec', res[0]);
      assert.equal(undefined, res[1]);
    });

    it('applies a conversion to the desired format for integers, string given', () => {

      const res = maf(['bjoern and robert are born on the %dst dec', 'foo']);
      assert.equal('bjoern and robert are born on the NaNst dec', res[0]);
      assert.equal(undefined, res[1]);
    });

    it('applies a conversion to the desired format for integers, float given', () => {

      const res = maf(['bjoern and robert are born on the %dst dec', 1.234]);
      assert.equal('bjoern and robert are born on the 1st dec', res[0]);
      assert.equal(undefined, res[1]);
    });
  });

  describe('float conversion', () => {

    it('applies a conversion to the desired format for floats, integer given', () => {

      const res = maf(['bjoern and robert are born on the %fst dec', 21]);
      assert.equal('bjoern and robert are born on the 21st dec', res[0]);
      assert.equal(undefined, res[1]);
    });

    it('applies a conversion to the desired format for floats, null given', () => {

      const res = maf(['bjoern and robert are born on the %fst dec', null]);
      assert.equal('bjoern and robert are born on the NaNst dec', res[0]);
      assert.equal(undefined, res[1]);
    });

    it('applies a conversion to the desired format for floats, false given', () => {

      const res = maf(['bjoern and robert are born on the %fst dec', false]);
      assert.equal('bjoern and robert are born on the NaNst dec', res[0]);
      assert.equal(undefined, res[1]);
    });

    it('applies a conversion to the desired format for floats, string given', () => {

      const res = maf(['bjoern and robert are born on the %fst dec', 'foo']);
      assert.equal('bjoern and robert are born on the NaNst dec', res[0]);
      assert.equal(undefined, res[1]);
    });

    it('applies a conversion to the desired format for integers, float given', () => {

      const res = maf(['bjoern and robert are born on the %fst dec', 1.234]);
      assert.equal('bjoern and robert are born on the 1.234st dec', res[0]);
      assert.equal(undefined, res[1]);
    });
  });
});
