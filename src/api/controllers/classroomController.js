'use strict';

const classroom = require('../models/classroom');

//insert new classroom
exports.insert = (req, res) => {
    const name = req.body.name;
    const code = req.body.code;
    const password = req.body.password;

    const newClassroom = new classroom({
        name: name,
        code: code,
        password: password
    });

    newClassroom.save();

    res.send(newClassroom);
};

//get a classroom by password
exports.getByPassword = (req, res) => {
    const password = req.params.password;

    classroom.find({ password: password }, (err, data) => {
        if (err) return res.send(err);

        for(let i=0; i<data.length; ++i){
            data[i].password = undefined;
        }

        res.send(data);
    });
};

//delete classroom
exports.delete = (req, res) => {
    const password = req.body.password;

    classroom.deleteOne({ password: password }, (err) => {
        if (err) return res.send(err);

        res.send({ message: 'sucess' });
    });
};

//update classroom
exports.update = (req, res) => {
    const old_password = req.body.old_password;
    const name = req.body.name;
    const code = req.body.code;
    const password = req.body.password;

    classroom.updateOne({ password: old_password }, {
        name: name,
        code: code,
        password: password
    }, (err, updateRes) => {
        if (err) return res.send(err);

        res.send(updateRes);
    });
};