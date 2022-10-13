const Web3 = require('Web3');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const endpoints = require('./endpoints');
const subscribe = require('./util/util').subscribe;

app.use(express.json());
app.use('/', endpoints);

mongoose.connect('mongodb://localhost/watchDog').then(() => {
    console.log('Connected to MongoDB...');
}).catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});

subscribe();