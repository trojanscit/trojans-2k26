const mongoose = require('mongoose');

const RegisteredSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  college_name: {
    type: String,
    default: null,
  },
  year: {
    type: String,
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
  referral_code:{
    type:String,
    default:null
  },
  events: {
    type: [String], // Array of event names
    default: [],
  },
});

module.exports = mongoose.model('Registered', RegisteredSchema);
