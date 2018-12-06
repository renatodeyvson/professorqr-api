'use strict';

const mongoose = require('mongoose');

let db = mongoose.connection;

db.on('error', console.error);
db.once('open', () => {
    console.log('[db] on');
});

mongoose.connect('mongodb://professorqruser:123456aA@ds213832.mlab.com:13832/professorqrdb', { useNewUrlParser: true });