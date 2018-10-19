'use strict';

const TelegramBot = require('node-telegram-bot-api');
const bot = require('./bot');
const MongoClient = require('mongodb').MongoClient;
const db = require('./db');
const express = require('express');
const app = express();
const api = require('./api/router');

bot(TelegramBot);
db(MongoClient);
api(app);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('[server] on %d', port);
});