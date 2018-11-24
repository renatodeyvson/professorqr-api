'use strict';

const doc = require('../models/doc');

//insert new doc
exports.insert = (req, res) => {
    const title = req.body.title;
    const url = req.body.url;
    const tags = req.body.tags.split(';');
    const classroom = req.body.classroom;

    const newDoc = insertDoc(title, url, tags, classroom);

    res.send(newDoc);
};

const insertDoc = (title, url, tags, classroom) => {
    const newDoc = new doc({
        title: title,
        url: url,
        tags: tags,
        classroom: classroom
    });

    newDoc.save();

    return newDoc;
};
exports.insertDoc = insertDoc;

//get all docs
exports.getAllByClassroom = (req, res) => {
    const classroom = req.params.classroom;

    getAllDocsByClassroomPromise(classroom).then((data) => {
        res.send(data);
    });
};

const getAllDocsByClassroomPromise = (classroom) => {
    return doc.find({ classroom: classroom }, (err, data) => {
        if (err) return err;

        return data;
    });
};
exports.getAllDocsByClassroomPromise = getAllDocsByClassroomPromise;

//delete doc
exports.delete = (req, res) => {
    const title = req.body.title;

    deleteDocPromise(title).then((data) => {
        res.send(data);
    });
};

const deleteDocPromise = (title) => {
    return doc.deleteOne({ title: title }, (err) => {
        if (err) return err;

        return { message: 'sucess' };
    });
};
exports.deleteDocPromise = deleteDocPromise;

//update doc
exports.update = (req, res) => {
    const old_title = req.body.old_title;
    const title = req.body.title;
    const url = req.body.url;
    const tags = req.body.tags.split(';');
    const classroom = req.body.classroom;

    updateDocPromise(old_title, title, url, tags, classroom).then((data) => {
        res.send(data);
    });
};

const updateDocPromise = (old_title, title, url, tags, classroom) => {
    return doc.updateOne({ title: old_title }, {
        title: title,
        url: url,
        tags: tags,
        classroom: classroom
    }, (err, updateRes) => {
        if (err) return err;

        return updateRes;
    });
};
exports.updateDocPromise = updateDocPromise;