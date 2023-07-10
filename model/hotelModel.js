const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfOpening: { type: String, required: true },
    location: { type: String, required: true},
    logo: { type: String ,default:"carpet.jpg"},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotelm", hotelSchema);
