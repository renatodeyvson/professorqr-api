'use strict';

const student = require('../models/student');

//insert new student
exports.insert = (req, res) => {
    const name = req.body.name;
    const classroom = req.body.classroom;
    const password = req.body.password;

    const newStudent = insertStudent(name, classroom, password);

    res.send(newStudent);
};

const insertStudent = (name, classroom, password) => {
    const newStudent = new student({
        name: name,
        classroom: classroom,
        password: password
    });

    newStudent.save();

    return newStudent;
};
exports.insertStudent = insertStudent;

//get all students of a classroom
exports.getAllByClassroom = (req, res) => {
    const classroom = req.params.classroom;

    getAllStudentsByClassroomPromise(classroom).then((data) => {
        res.send(data);
    });
};

const getAllStudentsByClassroomPromise = (classroom) => {
    return student.find({ classroom: classroom }, (err, data) => {
        if (err) return err;

        return data;
    });
};
exports.getAllStudentsByClassroomPromise = getAllStudentsByClassroomPromise;

//get student by password
exports.getByPassword = (req, res) => {
    const password = req.params.password;

    getStudentByPasswordPromise(password).then((data) => {
        res.send(data);
    });
}

const getStudentByPasswordPromise = (password) => {
    return student.find({ password: password }, (err, data) => {
        if (err) return err;

        return data;
    });
};
exports.getStudentByPasswordPromise = getStudentByPasswordPromise;

//delete student
exports.delete = (req, res) => {
    const password = req.body.password;

    deleteStudentPromise(password).then((data) => {
        res.send(data);
    });
};

const deleteStudentPromise = (password) => {
    return student.deleteOne({ password: password }, (err) => {
        if (err) return err;

        return { message: 'sucess' };
    });
};
exports.deleteStudentPromise = deleteStudentPromise;

//update student
exports.update = (req, res) => {
    const old_password = req.body.old_password;
    const name = req.body.name;
    const classroom = req.body.classroom;
    const password = req.body.password;
    const absences = req.body.absences;
    const notes = req.body.notes;

    updateStudentPromise(old_password, name, classroom, password, absences, notes).then((data) => {
        res.send(data);
    });
};

const updateStudentPromise = (old_password, name, classroom, password, absences, notes) => {
    return student.updateOne({ password: old_password }, {
        name: name,
        classroom: classroom,
        password: password,
        absences: absences,
        notes: notes
    }, (err, updateRes) => {
        if (err) return err;

        return updateRes;
    });
};
exports.updateStudentPromise = updateStudentPromise;