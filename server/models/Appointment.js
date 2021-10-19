const { Schema, model } = require("mongoose");

const dateFormat = require("../utils/dateFormat");

const appointmentSchema = new Schema({
  day: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  services: {
    type: String,
    required: true,
  },
});

const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;
