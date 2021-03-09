const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const mileagePerDay = new Schema({
  dayAfterService: {
    type: Number,
    min: 0,
    max: 20,
  },
  mileageToday: {
    type: Number,
    min: 0,
  },
  day: {
    type: Number,
    min: 1,
    max: 31,
    required: true,
  },
  typeOfService: {
    type: String,
    enum: ["ТО-3", "ТР-1", "ТР-3", ""],
  },
});

const mileageSchema = new Schema({
  trainId: SchemaTypes.ObjectId,
  year: {
    type: Number,
    min: 2000,
    max: 2030,
    required: true,
  },
  month: {
    type: Number,
    min: 1,
    max: 12,
    required: true,
  },
  mileagePerMonth: Number,
  days: {
    type: [mileagePerDay],
    index: true,
  },
});
mileageSchema.index({ trainId: 1, year: 1, month: 1 }, { unique: true });

module.exports = mongoose.model("Mileage", mileageSchema);
