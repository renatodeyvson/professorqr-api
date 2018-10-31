'use strict';

const mongoose = require('mongoose');

let db = mongoose.connection;

db.on('error', console.error);
db.once('open', () => {
    console.log('[db] on');
});

mongoose.connect('mongodb://localhost:27017/professorqrdb', { useNewUrlParser: true });