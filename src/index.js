// Imports: Dependencies
const SHA256 = require('crypto-js/sha256');

// Transaction
class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

// Block
class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    // Adds Random Factor For Security
    this.nonce = 0;
  }

  // Calculate Hash
  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      // Ad
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log('Block Mined: ' + this.hash);
  }

}

// Blockchain
class Blockchain {
  constructor() {
    this.chain = [];
    this.chain[0] = this.createGenesisBlock();
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  // Create First Block In Blockchain
  createGenesisBlock() {
    return new Block('01/01/2018', 'Genesis Block', '0');
  }

  // Get Last Block
  getLastBlock() {
    // Return Last Element
    return this.chain[this.chain.length - 1];
  }

  // // Add Block
  // addBlock(newBlock) {
  //   // Get Hash From Previous Block
  //   newBlock.previousHash = this.getLastBlock().hash;
  //   // Recalculate Hash
  //   // newBlock.hash = newBlock.calculateHash();
  //   newBlock.mineBlock(this.difficulty)
  //   // Add Block To Blockchain
  //   this.chain.push(newBlock);
  // }

  // Mine Pending Transactions
  minePendingTransactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    
    // Mine Block
    block.mineBlock(this.difficulty);
    console.log('Block successfully mined');

    // Add Block To Blockchain
    this.chain.push(block)

    // Reset Pending Transactions
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  // Create Transaction
  createTransaction(transaction) {
    // Add To Pending Transactions
    this.pendingTransactions.push(transaction)
  }

  // Get Account Balance
  getAccountBalance(address) {
    let balance = 0;

    // Iterate Over Blockchain
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }
        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }
    
    // Return Balance
    return balance;
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

    // Return True
    return true;
  }
}


// // Create Blockchain Instance
// let javascriptBlockchain = new Blockchain();

// // Add Data Blocks
// console.log('Mining Block 1 🤙')
// javascriptBlockchain.addBlock(new Block('04/20/2020', { amount: 100 }));
// console.log('Mining Block 2 🤙')
// javascriptBlockchain.addBlock(new Block('07/01/2021', { amount: 500 }));

// // View Blockchain Data
// console.log(JSON.stringify(javascriptBlockchain, null, 4));

// // Test Blockchain Validity
// console.log('Blockchain Valid: ' + javascriptBlockchain.isBlockchainValid());




// Create Blockchain Instance
let javascriptBlockchain = new Blockchain();

javascriptBlockchain.createTransaction(new Transaction('04/20/2020', { amount: 100 }));
javascriptBlockchain.createTransaction(new Transaction('07/01/2021', { amount: 500 }));

console.log('Starting Miner');
javascriptBlockchain.minePendingTransactions('Jeff')
console.log('Jeff\'s Balance: ' + javascriptBlockchain.getAccountBalance('Jeff'));

console.log('Starting Miner Again');
javascriptBlockchain.minePendingTransactions('Jeff')
console.log('Jeff\'s Balance: ' + javascriptBlockchain.getAccountBalance('Jeff'));