// Imports: Dependencies
const SHA256 = require('crypto-js/sha256');

// Block
class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  // Calculate Hash
  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

// Blockchain
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  // Create First Block In Blockchain
  createGenesisBlock() {
    return new Block(0, "01/01/2018", "Genesis Block", "0");
  }

  // Get Last Block
  getLastBlock() {
    // Return Last Element
    return this.chain[this.chain.length - 1];
  }

  // Add Block
  addBlock(newBlock) {
    // Get Hash From Previous Block
    newBlock.previousHash = this.getLastBlock().hash;
    // Recalculate Hash
    newBlock.hash = newBlock.calculateHash();
    // Add Block To Blockchain
    this.chain.push(newBlock);
  }

  // Check Blockchain Validity
  isBlockchainValid() {
    // Iterate Over The Blockchain, Starting After The Genesis Block/Index 1
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Compare Hashes
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      //  Compare Previous Hash
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
  }
}


// Create Blockchain Instance
let javascriptBlockchain = new Blockchain();

// Add Data Blocks
javascriptBlockchain.addBlock(new Block(1, "04/20/2020", { amount: 100 }));
javascriptBlockchain.addBlock(new Block(2, "07/01/2021", { amount: 500 }));

// View Blockchain Data
console.log(JSON.stringify(javascriptBlockchain, null, 4));

// Test Blockchain Validity
console.log('Blockchain Valid: ' + javascriptBlockchain.isBlockchainValid());