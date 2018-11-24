'use strict';

const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    classroom: String,
    activities: [{
        date: Date,
        description: String
    }]
});
  
const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;