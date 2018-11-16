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
    try {
      return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    catch (error) {
      console.log(error);
    }
  }

  // Mine Block
  mineBlock(difficulty) {
    try {
      while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
        this.nonce++;
        this.hash = this.calculateHash();
      }
      console.log(`Block Mined: ${this.hash}`);
    }
    catch (error) {
      console.log(error);
    }
  }
}

// Blockchain
class Blockchain {
  constructor() {
    this.chain = [];
    this.chain[0] = this.createGenesisBlock();
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  // Create First Block In Blockchain
  createGenesisBlock() {
    try {
      return new Block('01/01/2018', 'Genesis Block', '0');
    }
    catch (error) {
      console.log(error);
    }
  }

  // Get Last Block
  getLastBlock() {
    try {
      // Return Last Element
      return this.chain[this.chain.length - 1];
    }
    catch (error) {
      console.log(error);
    }
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
    try {
      const block = new Block(Date.now(), this.pendingTransactions);

      // Mine Block
      block.mineBlock(this.difficulty);
      console.log('Block successfully mined');

      // Add Block To Blockchain
      this.chain.push(block);

      // Reset Pending Transactions
      this.pendingTransactions = [
        new Transaction(null, miningRewardAddress, this.miningReward),
      ];
    }
    catch (error) {
      console.log(error);
    }
  }

  // Create Transaction
  createTransaction(transaction) {
    try {
      // Add To Pending Transactions
      this.pendingTransactions.push(transaction);
    }
    catch (error) {
      console.log(error);
    }
  }

  // Get Account Balance
  getAccountBalance(address) {
    try {
      // Beginning Balance
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
    catch (error) {
      console.log(error);
    }
  }

  // Check Blockchain Validity
  isBlockchainValid() {
    try {
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
    catch (error) {
      console.log(error);
    }
  }
}

// Exports
module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;
