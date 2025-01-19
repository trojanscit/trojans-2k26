const mongoose = require('mongoose');

const RegisteredSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  college_name: {
    type: String,
    default: null,
  },
  year: {
    type: Number,
    default: null,
  },
  department: {
    type: String,
    default: null,
  },
  phone_number: {
    type: String,
    default: null,
  },
  events: {
    type: [String], // Array of event names
    default: [],
  },
});

module.exports = mongoose.model('Registered', RegisteredSchema);
