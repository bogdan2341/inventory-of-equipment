const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const mountedWheelSchema = new Schema({
  wheelId: {
    type: SchemaTypes.ObjectId,
    ref: "WheelPair",
  },
  wheelType: {
    type: String,
    enum: ["Редукторная", "Бегунковая", "Поддерживающая"],
  },
});

const trainSchema = new Schema({
  number: {
    type: String,
    unique: true,
  },
  manufactureYear: {
    type: Number,
    min: 1960,
    max: 1995,
  },
  dateOfLastKR: Date,
  engine: {
    type: SchemaTypes.ObjectId,
    ref: "Engine",
  },
  transmission: {
    type: SchemaTypes.ObjectId,
    ref: "Transmission",
  },
  wheelPairs: {
    1: mountedWheelSchema,
    2: mountedWheelSchema,
    3: mountedWheelSchema,
    4: mountedWheelSchema,
    5: mountedWheelSchema,
  },
});

module.exports = mongoose.model("Train", trainSchema);
