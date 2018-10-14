'use strict';

const TelegramBot = require('node-telegram-bot-api');
let config = {};

try{
    config = require('../internal-config');
} catch(err) {
    config.token = '<PUT YOUR TOKEN HERE OR CREATE A internal-config.js FILE>';
}

const token = config.token;
const bot = new TelegramBot(token, {polling: true});

module.exports = () => {

    bot.onText(/\/start/, (msg) => {

        bot.sendMessage(msg.chat.id, 'Bem vindo! Eu sou o Professor Que Responde. No momento eu não tenho nenhum material que possa te ajudar, entre em contato diretamente com seu professor. :(');
            
    });
    
    bot.on('message', (msg) => {

        if(msg.text.toString().toLowerCase().includes('seu github'))
            bot.sendMessage(msg.chat.id, 'Visite o perfil: https://github.com/renatodeyvson');
        else if(msg.text.toString().toLowerCase().includes('renatinho'))
            bot.sendMessage(msg.chat.id, 'EU NÃO TENHO NADA A VER COM ESSE MACONHEIRO...');
        else
            bot.sendMessage(msg.chat.id, 'Desculpe, não entendi. :/');
    
    });

};