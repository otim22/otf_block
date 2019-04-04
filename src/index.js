const { Blockchain, Transaction, Block } require('./blockchain');

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