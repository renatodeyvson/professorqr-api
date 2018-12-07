'use strict';

const doc = require('./api/controllers/docController');
const classroom = require('./api/controllers/classroomController');
const student = require('./api/controllers/studentController');
const schedule = require('./api/controllers/scheduleController');

module.exports = (TelegramBot) => {

    const token = process.env.BOT_TOKEN || '639722122:AAGJK_ZpfUZWhWqpSCktTM9X8gGLNN9V9o8';
    const bot = new TelegramBot(token, {polling: true});

    bot.onText(/\/start/, (msg) => {

        bot.sendMessage(msg.chat.id, 'Bem vindo! Eu sou o Professor Que Responde. Como eu posso ajudar? :)');
            
    });
    
    bot.on('message', (msg) => {

        const content = msg.text.toString().toLowerCase();

        if(content.includes('seu github')){

            bot.sendMessage(msg.chat.id, 'Visite o perfil: https://github.com/renatodeyvson');

        }
        else if(content[0] == '#'
            && content.includes('documentos')){
            
            doc.getAllDocsByClassroomPromise(content.substring(1, content.indexOf(' '))).then((data) => {
                let final_msg = '';
                data.forEach((element, index, array) => {
                    if(index != 0) final_msg += '\n\n';

                    final_msg += 'Título: '+element.title;
                    final_msg += '\nURL: '+element.url;
                });

                if(final_msg === '') final_msg = 'Nenhuma informação foi encontrada. :(';
                bot.sendMessage(msg.chat.id, final_msg);
            });

        }
        else if(content[0] == '#'
            && content.includes('cronograma')){
            
            schedule.getAllSchedulesByClassroomPromise(content.substring(1, content.indexOf(' '))).then((data) => {
                let final_msg = '';
                data[0].activities.forEach((element, index, array) => {
                    if(index != 0) final_msg += '\n\n';

                    final_msg += 'Data: '+element.date.getUTCDate()+'/'+(element.date.getMonth()+1);
                    final_msg += '\nDescrição: '+element.description;
                });

                if(final_msg === '') final_msg = 'Nenhuma informação foi encontrada. :(';
                bot.sendMessage(msg.chat.id, final_msg);
            });

        }
        else if(content[0] == '$'
        && content.includes('nota')){

            student.getStudentByPasswordPromise(content.substring(1, content.indexOf(' '))).then((data) => {
                let final_msg = '';
                data[0].notes.forEach((element, index, array) => {
                    if(index != 0) final_msg += '\n\n';

                    final_msg += 'Nome: '+element.evaluation_name;
                    final_msg += '\nNota: '+element.value;
                });

                if(final_msg === '') final_msg = 'Nenhuma informação foi encontrada. :(';
                bot.sendMessage(msg.chat.id, final_msg);
            });

        }
        else if(content[0] == '$'
        && content.includes('falta')){

            student.getStudentByPasswordPromise(content.substring(1, content.indexOf(' '))).then((data) => {
                let final_msg = data[0].absences;
                
                if(final_msg === '') final_msg = 'Nenhuma informação foi encontrada. :(';
                bot.sendMessage(msg.chat.id, final_msg);
            });

        }
        else{

            bot.sendMessage(msg.chat.id, 'Desculpe, não entendi. :/');

        }
    
    });

};