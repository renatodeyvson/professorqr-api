'use strict';

const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    name: String,
    code: String,
    password: String
});
  
const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;