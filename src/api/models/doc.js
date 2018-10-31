'use strict';

const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
    title: String,
    url: String,
    tags: [String],
    classroom: String
});
  
const Doc = mongoose.model('Doc', docSchema);

module.exports = Doc;