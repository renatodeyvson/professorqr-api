'use strict';

const doc = require('../models/doc');

//insert new doc
exports.insert = (req, res) => {
    const title = req.body.title;
    const url = req.body.url;
    const tags = req.body.tags.split(';');
    const classroom = req.body.classroom;

    const newDoc = new doc({
        title: title,
        url: url,
        tags: tags,
        classroom: classroom
    });

    newDoc.save();

    res.send(newDoc);
};

//get all docs
exports.getAllByClassroom = (req, res) => {
    const classroom = req.params.classroom;

    doc.find({ classroom: classroom }, (err, data) => {
        if (err) return res.send(err);

        res.send(data);
    });
};

//delete doc
exports.delete = (req, res) => {
    const title = req.body.title;

    doc.deleteOne({ title: title }, (err) => {
        if (err) return res.send(err);

        res.send({ message: 'sucess' });
    });
};

//update doc
exports.update = (req, res) => {
    const old_title = req.body.old_title;
    const title = req.body.title;
    const url = req.body.url;
    const tags = req.body.tags.split(';');
    const classroom = req.body.classroom;

    doc.updateOne({ title: old_title }, {
        title: title,
        url: url,
        tags: tags,
        classroom: classroom
    }, (err, updateRes) => {
        if (err) return res.send(err);

        res.send(updateRes);
    });
};