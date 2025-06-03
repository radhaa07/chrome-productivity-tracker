const mongoose = require('mongoose');

const timeLogSchema = new mongoose.Schema({
  userId: String,
  website: String,
  timeSpent: Number, // time in seconds or milliseconds
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TimeLog', timeLogSchema);
