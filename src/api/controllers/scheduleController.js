'use strict';

const schedule = require('../models/schedule');

//insert new schedule
exports.insert = (req, res) => {
    const classroom = req.body.classroom;
    const activities = req.body.activities;

    const newSchedule = new schedule({
        classroom: classroom,
        activities: activities
    });

    newSchedule.save();

    res.send(newSchedule);
};

//get all schedules of a classroom
exports.getAllByClassroom = (req, res) => {
    const classroom = req.params.classroom;

    schedule.find({ classroom: classroom }, (err, data) => {
        if (err) return res.send(err);

        res.send(data);
    });
};

//delete schedule
exports.delete = (req, res) => {
    const classroom = req.body.classroom;

    schedule.deleteOne({ classroom: classroom }, (err) => {
        if (err) return res.send(err);

        res.send({ message: 'sucess' });
    });
};

//update schedule
exports.update = (req, res) => {
    const old_classroom = req.body.old_classroom;
    const classroom = req.body.classroom;
    const activities = req.body.activities;

    schedule.updateOne({ classroom: old_classroom }, {
        classroom: classroom,
        activities: activities
    }, (err, updateRes) => {
        if (err) return res.send(err);

        res.send(updateRes);
    });
};