// Imports
const { Blockchain, Transaction } = require('./blockchain');

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
const javascriptBlockchain = new Blockchain();

javascriptBlockchain.createTransaction(new Transaction('04/20/2020', { amount: 100 }));
javascriptBlockchain.createTransaction(new Transaction('07/01/2021', { amount: 500 }));

console.log('Starting Miner');
javascriptBlockchain.minePendingTransactions('Jeff');
console.log(`Jeff's Balance: ${javascriptBlockchain.getAccountBalance('Jeff')}`);

console.log('Starting Miner Again');
javascriptBlockchain.minePendingTransactions('Jeff');
console.log(`Jeff's Balance: ${javascriptBlockchain.getAccountBalance('Jeff')}`);
