'use strict';

const student = require('../models/student');

//insert new student
exports.insert = (req, res) => {
    const name = req.body.name;
    const classroom = req.body.classroom;
    const password = req.body.password;

    const newStudent = new student({
        name: name,
        classroom: classroom,
        password: password
    });

    newStudent.save();

    res.send(newStudent);
};

//get all students of a classroom
exports.getAllByClassroom = (req, res) => {
    const classroom = req.params.classroom;

    student.find({ classroom: classroom }, (err, data) => {
        if (err) return res.send(err);

        res.send(data);
    });
};

//delete student
exports.delete = (req, res) => {
    const password = req.body.password;

    student.deleteOne({ password: password }, (err) => {
        if (err) return res.send(err);

        res.send({ message: 'sucess' });
    });
};

//update student
exports.update = (req, res) => {
    const old_password = req.body.old_password;
    const name = req.body.name;
    const classroom = req.body.classroom;
    const password = req.body.password;
    const absences = req.body.absences;
    const notes = req.body.notes;

    student.updateOne({ password: old_password }, {
        name: name,
        classroom: classroom,
        password: password,
        absences: absences,
        notes: notes
    }, (err, updateRes) => {
        if (err) return res.send(err);

        res.send(updateRes);
    });
};