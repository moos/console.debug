let assert = require('assert');

global.localStorage = {};
require('./index');

describe('console.debug', () => {

  beforeEach(() => {
    localStorage.debug = '';
  });

  describe('global usage', () => {

    it('no arg returns array of namespaces', () => {
      assert.deepEqual(console.debug(), []);
      localStorage.debug = 'a,b,c';
      assert.deepEqual(console.debug(), ['a','b','c']);
    });

    it('enable/disable static methods', () => {
      localStorage.debug = 'a,b,c';
      console.debug.disable();
      assert.equal(localStorage.debug, '');
      console.debug.enable();
      assert.equal(localStorage.debug, 'a,b,c');
    });
  });

  describe('namespaced', () => {

    it('enables and disables', () => {
      console.debug('foo').enable();
      assert.equal(localStorage.debug, 'foo');
      console.debug('foo').disable();
      assert.equal(localStorage.debug, '')
    });

    it('returns enabled state', () => {
      console.debug('foo').enable();
      assert.equal(console.debug('foo').enabled, true);
      console.debug('foo').disable();
      assert.equal(console.debug('foo').enabled, false);
      // unknown ns
      assert.equal(console.debug('fooo').enabled, false);
    });

    it('is idempotent', () => {
      console.debug('foo').enable();
      console.debug('foo').enable();
      assert.equal(localStorage.debug, 'foo')
      console.debug('foo').disable();
      console.debug('foo').disable();
      assert.equal(localStorage.debug, '')
    });

    it('handles multiple namespaces', () => {
      console.debug('foo').enable();
      console.debug('fooo').enable();
      assert.equal(localStorage.debug, 'foo,fooo')
      console.debug('foo').disable();
      console.debug('fooo').disable();
      assert.equal(localStorage.debug, '')
    });

    it('supports index', () => {
      console.debug('foo').enable();
      console.debug('fooo').enable();
      assert.deepEqual(console.debug(), ['foo', 'fooo'])
      assert.equal(console.debug(0).enabled, true);
      assert.equal(console.debug(1).enabled, true);
      assert.equal(console.debug(2).enabled, false);
      console.debug(0).disable();
      assert.deepEqual(console.debug(), ['fooo']);
      console.debug(0).disable();  // 0 again!
      assert.deepEqual(console.debug(), []);
    });
  });

  // TODO handle negatives & *
  
});
