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
api(app);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('[server] on %d', port);
});