const { Transaction, Block, Blockchain } = require('../src/blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const signingKey = ec.keyFromPrivate('478f504d5b3c73b17941eb1646d6d58a0bf873bef51138784e4acf2547e02002');

function createSignedTx() {
    const txObject = new Transaction(signingKey.getPublic('hex'), 'wallet2', 10);
    txObject.timestamp = 1;
    txObject.signTransaction(signingKey);

    return txObject;
}

function createBlockchainWithTx() {
    const blockchain = new Blockchain();
    const walletAddr = signingKey.getPublic('hex');
    const validTx = new Transaction(walletAddr, 'b2', 10);
    validTx.signTransaction(signingKey);

    blockchain.addTransaction(validTx);
    blockchain.addTransaction(validTx);
    blockchain.minePendingTransactions(1);

    return blockchain;
}

module.exports.signingKey = signingKey;
module.exports.createSignedTx = createSignedTx;
module.exports.createBlockchainWithTx = createBlockchainWithTx;