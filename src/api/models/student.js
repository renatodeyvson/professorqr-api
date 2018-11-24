'use strict';

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    classroom: String,
    password: String,
    absences: Number,
    notes: [{
        evaluation_name: String,
        value: Number
    }]
});
  
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;