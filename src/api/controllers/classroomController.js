'use strict';

const classroom = require('../models/classroom');

//insert new classroom
exports.insert = (req, res) => {
    const name = req.body.name;
    const code = req.body.code;
    const password = req.body.password;

    const newClassroom = insertClassroom(name, code, password);

    res.send(newClassroom);
};

const insertClassroom = (name, code, password) => {
    const newClassroom = new classroom({
        name: name,
        code: code,
        password: password
    });

    newClassroom.save();

    return newClassroom;
};
exports.insertClassroom = insertClassroom;

//get a classroom by password
exports.getByPassword = (req, res) => {
    const password = req.params.password;

    getClassroomByPasswordPromise(password).then((data) => {
        res.send(data);
    });
};

const getClassroomByPasswordPromise = (password) => {
    return classroom.find({ password: password }, (err, data) => {
        if (err) return err;

        for(let i=0; i<data.length; ++i){
            data[i].password = undefined;
        }

        return data;
    });
};
exports.getClassroomByPasswordPromise = getClassroomByPasswordPromise;

//delete classroom
exports.delete = (req, res) => {
    const password = req.body.password;

    deleteClassroomPromise(password).then((data) => {
        res.send(data);
    });
};

const deleteClassroomPromise = (password) => {
    return classroom.deleteOne({ password: password }, (err) => {
        if (err) return err;

        return { message: 'sucess' };
    });
};
exports.deleteClassroomPromise = deleteClassroomPromise;

//update classroom
exports.update = (req, res) => {
    const old_password = req.body.old_password;
    const name = req.body.name;
    const code = req.body.code;
    const password = req.body.password;

    updateClassroomPromise(old_password, name, code, password).then((data) => {
        res.send(data);
    });
};

const updateClassroomPromise = (old_password, name, code, password) => {
    return classroom.updateOne({ password: old_password }, {
        name: name,
        code: code,
        password: password
    }, (err, updateRes) => {
        if (err) return err;

        return updateRes;
    });
};
exports.updateClassroomPromise = updateClassroomPromise;