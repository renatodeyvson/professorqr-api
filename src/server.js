'use strict';

const TelegramBot = require('node-telegram-bot-api');
const bot = require('./bot');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./api/router');

bot(TelegramBot);
require('./db');

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
})
api(app);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('[server] on %d', port);
});