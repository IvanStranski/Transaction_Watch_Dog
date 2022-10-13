const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    blockNumber: {type: Number, required: true },
    tx: { type: String, required: true },
    to: { type: String, required: true },
    from: { type: String, required: true },
    value: { type: Number, required: true },
    config: { type: String, required: true }
});

module.exports = transactionSchema;