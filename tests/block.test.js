const assert = require('assert');
const { Block, Transaction } = require('../src/blockchain');
const { createSignedTx } = require('./helpers');

let blockObj = null;

beforeEach(function() {
    blockObj = new Block(1000, [createSignedTx()], 'a1');
});

describe('Block class', function() {
    describe('constructor', function() {
        it('should correctly save paramemters', function() {
            assert.equal(blockObj.previousHash, 'a1');
            assert.equal(blockObj.timestamp, 1000);
            assert.deepEqual(blockObj.transactions, [createSignedTx()]);
            assert.equal(blockObj.nonce, 0);
        });
    });

    describe('Calculate hash', function() {
        it('should correctly caculate hash', function() {
            blockObj.timestamp = 1;
            blockObj.mineBlock(1);

            assert.equal(
                blockObj.hash,
                '0c7a345d23771fd4e5837b98e8e0933377a423d6179006d4e0c7c0b4a8e44ad6'
            );
        });

        it('should change when we tamper with the tx', function() {
            const origHash = blockObj.calculateHash();
            blockObj.timestamp = 100;

            assert.notEqual(
                blockObj.calculateHash(),
                origHash
            );
        });
    });

    describe('Has valid transactions', function() {
        it('should return true with all valid tx', function() {
            blockObj.transactions = [
                createSignedTx(),
                createSignedTx(),
                createSignedTx(),
            ];

            assert(blockObj.hasValidTransactions());
        });

        it('should return false when a single tx is bad', function() {
            const badTx = createSignedTx();
            badTx.amount = 1337;

            blockObj.transactions = [
                createSignedTx(),
                badTx
            ];

            assert(!blockObj.hasValidTransactions());
        });
    });
});