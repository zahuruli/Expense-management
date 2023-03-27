const mongoose = require("mongoose");

const transectionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"],
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    type: {
      type: String,
      required: [true, "type is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    refrence: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    date: {
      type: Date,
      required: [true, "date is required"],
    },
  },
  { timestamps: true }
);

const transectionModel = mongoose.model("transection", transectionSchema);
module.exports = transectionModel;
