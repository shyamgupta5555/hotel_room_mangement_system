const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfOpening: { type: Date, required: true },
    location: { type: String, required: true, unique: true },
    logo: { type: String },
  },
  { timestamps: true }
);

module.export = mongoose.model("Hotel", hotelSchema);
