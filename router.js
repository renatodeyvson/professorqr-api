'use strict';

const bot = require('./controllers/botController');

module.exports = (app) => {

    //bot server
    bot();

};