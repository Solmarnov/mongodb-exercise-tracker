const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  distance: {
    type: Number,
    trim: true
  },
  duration: {
    type: Number,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  reps: {
    type: Number,
    trim: true
  },
  sets: {
    type: Number,
    trim: true
  },
  type: {
    type: String,
    trim: true,
  },
  weight: {
    type: Number,
    trim: true
  }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;