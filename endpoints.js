const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const transactionSchema = require('./Schemas/Transaction');

const Transaction = mongoose.model('Transaction', transactionSchema);

router.get("/getTransaction", async (req, res) => {
    const blockNumber = req.body.blockNumber;
    const tx = req.body.tx;

    if (!blockNumber) {
        res.status(400).send("Parameter \"blockNumber\" is required!");
    }

    if (!tx) {
        res.status(400).send("Parameter \"tx\" is required!");
    }

    const transactions = await Transaction.find({blockNumber: blockNumber, tx: tx});

    if (!transactions) {
        res.status(404).send("Transaction was not found!");
    }
    
    res.send(transactions);
});

router.get("/getIncomingTransactions", async (req, res) => {
    const recipient = req.body.to;

    if (!recipient) {
        res.status(400).send("Parameter \"to\" is required!");
    }

    const transactions = await Transaction.find({to: recipient});

    if (!transactions) {
        res.status(404).send("Transaction was not found!");
    }
    
    res.send(transactions);
});

router.get("/getOutgoingTransactions", async (req, res) => {
    const sender = req.body.from;

    if (!recipient) {
        res.status(400).send("Parameter \"from\" is required!");
    }

    const transaction = await Transaction.find({from: sender});

    if (!transaction) {
        res.status(404).send("Transaction was not found!");
    }

    res.send(transaction);
});

router.get("/getAllTransactionsBlock", async (req, res) => {
    const blockNumber = req.body.blockNumber;

    if (!blockNumber) {
        res.status(400).send("Parameter \"blockNumber\" is required!");
    }

    const transactions = await Transaction.find({blockNumber: blockNumber});

    if (!transactions) {
        res.status(404).send(`Transactions from block number ${blockNumber} were not found!`);
    }
    
    res.send(transactions);
});


router.get("/getAllTransactions", async (req, res) => {
    const transactions = await Transaction.find();
    res.send(transactions);
});

router.post('/create', async (req, res) => {
    
    let transaction = await Transaction.findOne({blockNumber: req.body.blockNumber, tx: req.body.tx});
    
    if (transaction) {
        return res.status(400).send("Transaction with given block number and hash already exists!");
    }

    transaction = new Transaction({
        blockNumber: req.body.blockNumber,
        tx: req.body.tx,
        to: req.body.to,
        from: req.body.from,
        value: req.body.value,
        config: req.body.config
    });

    try {
        await transaction.save();
        res.send(transaction);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put('/update', async (req, res) => {
    const blockNumber = req.body.blockNumber;
    const tx = req.body.tx;

    if (!blockNumber) {
        return res.status(400).send("Parameter \"blockNumber\" is required!");
    }

    if (!tx) {
        return res.status(400).send("Parameter \"tx\" is required!");
    }

    let transaction = await Transaction.findOne({blockNumber:blockNumber, tx: tx});
    
    if (!transaction) {
        return res.status(404).send("Transaction with given block number or hash doesn not exist!");
    }

    for (el in req.body) {
        transaction[el] = req.body[el];
    }

    await transaction.save();
    res.send(transaction);
});

router.delete('/delete', async(req, res) => {
    const blockNumber = req.body.blockNumber;
    const tx = req.body.tx;

    if (!blockNumber) {
        return res.status(400).send("Parameter \"blockNumber\" is required!");
    }

    if (!tx) {
        return res.status(400).send("Parameter \"tx\" is required!");
    }

    let transaction = await Transaction.findOne({blockNumber: blockNumber, tx: tx});
    
    if (!transaction) {
        return res.status(404).send("Transaction with given block number or hash doesn not exist!");
    }

    await transaction.delete();
    res.send(transaction);
});

module.exports = router;