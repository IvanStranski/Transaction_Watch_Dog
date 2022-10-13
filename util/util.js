const Web3 = require('Web3');
const config = require('../config.json');
const mongoose = require('mongoose');
const transactionSchema = require('../Schemas/Transaction');

var url = process.env.URL;

var web3 = new Web3(url);

const Transaction = mongoose.model('Transaction', transactionSchema);

function subscribe() {
    const subcscription = web3.eth.subscribe(
        "newBlockHeaders",
        (err, result) => {
            if (!err) {
                const { hash } = result;
                saveLatestTransactions(hash);
            } else {
                console.log(err);
            }
        }
    );
}

function check(transaction) {
    for (el in config) {
        
        if (el === "name") {
            continue;
        }

        if (el === "value") {
            if (transaction[el] >= config[el]) {
                return true;
            } else {
                return false;
            }
        } else {
            if (transaction[el] in [config[el]]) {
                return true;
            } else {
                return false;
            }
        }
    }
}

async function saveLatestTransactions(blockNumber) {
    const block = await web3.eth.getBlock(blockNumber);
    for (let tx of block.transactions) {
        let transactionInfo = await web3.eth.getTransaction(tx);
        
        if (!check(transactionInfo)) {
            continue;
        }

        const transaction = new Transaction({
            blockNumber: blockNumber,
            tx: tx,
            to: transactionInfo.to,
            from: transactionInfo.from,
            value: transactionInfo.value,
            config: config.name
        });
        console.log("Saving...")
        await transaction.save();
    }
}

module.exports.check = check;
module.exports.saveLatestTransactions = saveLatestTransactions;
module.exports.subscribe = subscribe;