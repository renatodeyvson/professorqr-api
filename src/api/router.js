'use strict';

const classroom = require('./controllers/classroomController');
const doc = require('./controllers/docController');
const schedule = require('./controllers/scheduleController');
const student = require('./controllers/studentController');

module.exports = (app) => {

    const classroomRoute = 'classrooms';
    app.get('/'+classroomRoute+'/:password', classroom.getByPassword);
    app.post('/'+classroomRoute, classroom.insert);
    app.delete('/'+classroomRoute, classroom.delete);
    app.put('/'+classroomRoute, classroom.update);

    const docRoute = 'docs';
    app.get('/'+docRoute+'/:classroom', doc.getAllByClassroom);
    app.post('/'+docRoute, doc.insert);
    app.delete('/'+docRoute, doc.delete);
    app.put('/'+docRoute, doc.update);

    const scheduleRoute = 'schedules';
    app.get('/'+scheduleRoute+'/:classroom', schedule.getAllByClassroom);
    app.post('/'+scheduleRoute, schedule.insert);
    app.delete('/'+scheduleRoute, schedule.delete);
    app.put('/'+scheduleRoute, schedule.update);

    const studentRoute = 'students';
    app.get('/'+studentRoute+'/:classroom', student.getAllByClassroom);
    app.get('/'+studentRoute+'/me/:password', student.getByPassword);
    app.post('/'+studentRoute, student.insert);
    app.delete('/'+studentRoute, student.delete);
    app.put('/'+studentRoute, student.update);

};