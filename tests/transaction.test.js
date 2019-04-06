const assert = require('assert');
const { Transaction } = require('../src/blockchain');
const { createSignedTx, signingKey } = require('./helpers');

let txObject = null;

beforeEach(function() {
    txObject = new Transaction('fromAddress', 'toAddress', 9999);
});

describe('Transaction class', function() {
    describe('Constructor', function() {
        it('should automatically set the current date', function() {
            const actual = txObject.timestamp;
            const minTime = Date.now() - 1000;
            const maxTime = Date.now() + 1000;

            assert(!(actual > minTime && actual < maxTime), 'Tx does not have a good timestamp');
        });

        it('should correctly save from, to and amount', function() {
            txObjext = new Transaction('a1', 'b1', 10);

            assert.equal(txObjext.fromAddress, 'a1');
            assert.equal(txObjext.toAddress, 'b1');
            assert.equal(txObjext.amount, 10);
        });
    });

    describe('Calculate hash', function() {
        it('should correctly calculate the SHA256', function() {
            txObjext = new Transaction('a1', 'b1', 10);
            txObjext.timestamp = 1;

            assert.equal(
                txObjext.calculateHash(),

                // Output of SHA256(a1b1101)
                'c4aff6717617a3a658c041adf184e3ffc4b7cbe94df27b96b6905f3cdba30422'
            );
        });

        it('should change when we tamper with the tx', function() {
            txObjext = new Transaction('a1', 'b1', 10);

            const originalHash = txObjext.calculateHash();
            txObjext.amount = 100;

            assert.notEqual(
                txObjext.calculateHash(),
                originalHash
            );
        });
    });

    describe('isValid', function() {
        it('should throw error without signature', function() {
            assert.throws(() => { txObjext.isValid() }, Error);
        });

        it('should correctly sign transactions', function() {
            txObjext = createSignedTx();

            assert.equal(
                txObjext.signature,
                '304502206697e04501c4b7de54f19b1de886bd82b19ea6' +
                '94c154c8c1acd368401a325f0502210095ff5e5ecdb14f77' +
                'c042dd81ef84ae0fec767028d43c804ba1460bbfd151f50b'
            );
        });

        it('should not sign transactions for other wallets', function() {
            txObjext = new Transaction('not a correct wallet key', 'wallet2', 10);
            txObjext.timestamp = 1;

            assert.throws(() => {
                txObjext.signTransaction(signingKey);
            }, Error);
        });

        it('should detect badly signed transactions', function() {
            txObjext = createSignedTx();

            // Tamper with it and it should be invalid! 
            txObjext.amount = 100;
            assert(!txObjext.isValid());
        });

        it('should return true with correctly signed tx', function() {
            txObjext = createSignedTx();
            assert(txObjext.isValid());
        });

        it('should fail when signature is empty string', function() {
            txObjext.signature = '';
            assert.throws(() => { txObjext.isValid() }, Error);
        });

        it('should return true for mining rewards', function() {
            txObjext.fromAddress = null;
            assert(txObjext.isValid());
        });
    });
});