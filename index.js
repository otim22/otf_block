const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(
            this.index + 
            this.timestamp + 
            this.previousHash + 
            JSON.stringify(this.data) +
            this.nonce
        ).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("BLOCK MINED: " + this.hash);
    }
}


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2019", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        // newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let otfCoin = new Blockchain();
// otfCoin.addBlock(new Block(1, "10/03/2019", { amount: 4 }));
// otfCoin.addBlock(new Block(2, "14/03/2019", { amount: 45 }));

// console.log('Is blockchain valid? ' + otfCoin.isChainValid());

// otfCoin.chain[1].data = { amount: 10 }
// otfCoin.chain[1].hash = otfCoin.chain[1].calculateHash()
// console.log('Is blockchain valid? ' + otfCoin.isChainValid());
// console.log(JSON.stringify(otfCoin, null, 4));

console.log('Mining block 1');
otfCoin.addBlock(new Block(1, "20/07/2018", { amount: 4 }));

console.log('Mining block 2');
otfCoin.addBlock(new Block(2, "20/07/2018", { amount: 8 }));

