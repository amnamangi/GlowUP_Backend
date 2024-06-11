const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  date: String,
  time: String,
  quantity: Number,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
