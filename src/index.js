const { Blockchain, Transaction, Block } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('478f504d5b3c73b17941eb1646d6d58a0bf873bef51138784e4acf2547e02002');
const myWalletAddress = myKey.getPublic('hex');

let otfCoin = new Blockchain();

/**  First testing
otfCoin.addBlock(new Block(1, "10/03/2019", { amount: 4 }));
otfCoin.addBlock(new Block(2, "14/03/2019", { amount: 45 }));

console.log('Is blockchain valid? ' + otfCoin.isChainValid());

otfCoin.chain[1].data = { amount: 10 }
otfCoin.chain[1].hash = otfCoin.chain[1].calculateHash()
console.log('Is blockchain valid? ' + otfCoin.isChainValid());
console.log(JSON.stringify(otfCoin, null, 4));
*/


/** Second Testing

console.log('Mining block 1');
otfCoin.addBlock(new Block(1, "20/07/2018", { amount: 4 }));

console.log('Mining block 2');
otfCoin.addBlock(new Block(2, "20/07/2018", { amount: 8 }));
*/

/** Third Testing
console.log('Creating some transactions...');
otfCoin.createTransaction(new Transaction('address1', 'address2', 100));
otfCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('Starting the miner...');
otfCoin.minePendingTransactions('ots-address');

console.log('Balance of Ots address is', otfCoin.getBalanceOfAddress('ots-address'));
// Output: 0

console.log('Starting the miner again!');
otfCoin.minePendingTransactions("ots-address");

console.log('Balance of Ots address is', otfCoin.getBalanceOfAddress('ots-address'));
// Output: 100
*/

// Fouth Testing

const tx1 = new Transaction(myWalletAddress, 'Public key goes here', 10);
tx1.signTransaction(myKey);
otfCoin.addTransaction(tx1);

console.log('Starting miner...');
otfCoin.minePendingTransactions(myWalletAddress);

console.log('Balance of Ots is ', otfCoin.getBalanceOfAddress(myWalletAddress));

// Tampering
otfCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid? ', otfCoin.isChainValid());
