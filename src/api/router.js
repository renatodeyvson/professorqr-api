'use strict';

const doc = require('./controllers/docController');

module.exports = (app) => {

    const docRoute = 'docs';
    app.get('/'+docRoute+'/:classroom', doc.getAllByClassroom);
    app.post('/'+docRoute, doc.insert);
    app.delete('/'+docRoute, doc.delete);
    app.put('/'+docRoute, doc.update);

};