'use strict';

const schedule = require('../models/schedule');

//insert new schedule
exports.insert = (req, res) => {
    const classroom = req.body.classroom;
    const activities = req.body.activities;

    const newSchedule = insertSchedule(classroom, activities);

    res.send(newSchedule);
};

const insertSchedule = (classroom, activities) => {
    const newSchedule = new schedule({
        classroom: classroom,
        activities: activities
    });

    newSchedule.save();

    return newSchedule;
};
exports.insertSchedule = insertSchedule;

//get all schedules of a classroom
exports.getAllByClassroom = (req, res) => {
    const classroom = req.params.classroom;

    getAllSchedulesByClassroomPromise(classroom).then((data) => {
        res.send(data);
    });
};

const getAllSchedulesByClassroomPromise = (classroom) => {
    return schedule.find({ classroom: classroom }, (err, data) => {
        if (err) return err;

        return data;
    });
};
exports.getAllSchedulesByClassroomPromise = getAllSchedulesByClassroomPromise;

//delete schedule
exports.delete = (req, res) => {
    const classroom = req.body.classroom;

    deleteSchedulePromise(classroom).then((data) => {
        res.send(data);
    });
};

const deleteSchedulePromise = (classroom) => {
    return schedule.deleteOne({ classroom: classroom }, (err) => {
        if (err) return err;

        return { message: 'sucess' };
    });
};
exports.deleteSchedulePromise = deleteSchedulePromise;

//update schedule
exports.update = (req, res) => {
    const old_classroom = req.body.old_classroom;
    const classroom = req.body.classroom;
    const activities = req.body.activities;

    updateSchedulePromise(old_classroom, classroom, activities).then((data) => {
        res.send(data);
    });
};

const updateSchedulePromise = (old_classroom, classroom, activities) => {
    return schedule.updateOne({ classroom: old_classroom }, {
        classroom: classroom,
        activities: activities
    }, (err, updateRes) => {
        if (err) return err;

        return updateRes;
    });
};
exports.updateSchedulePromise = updateSchedulePromise;