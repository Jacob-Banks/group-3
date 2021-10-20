const { Schema, model } = require("mongoose");

const dateFormat = require("../utils/dateFormat");

const appointmentSchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
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
