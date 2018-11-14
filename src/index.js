// Imports: Dependencies
import SHA256 from 'crypto-js';

// Block
class Block {
  constructor(index, data, timestamp, previousHash = '') {
    this.index = index;
    this.data = data;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).string()
  }

}

// Blockchain
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  // Create First Block In Blockchain
  createGenesisBlock() {
    return new Block (0, '01.01.2018', 'First Block Of Data', '0')
  }
}