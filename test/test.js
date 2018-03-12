import './lib/mocha.css';
import './test.css';
import {log} from '../src/utils';
mocha.setup('bdd');

const assert = chai.assert;


describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value not found', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});




require('./mochaInit');