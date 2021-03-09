const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const transmissionSchema = new Schema({
  number: Number,
  productionYear: {
    type: Number,
    min: 1950,
    max: 2010,
  },
  installationHistory: [
    {
      dateFrom: Date,
      dateTo: Date,
      on: {
        type: SchemaTypes.ObjectId,
        ref: "Train",
      },
    },
  ],
  repairHistory: [
    {
      date: Date,
      where: String,
      description: String,
    },
  ],
});

module.exports = mongoose.model("Transmission", transmissionSchema);
