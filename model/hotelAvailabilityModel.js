const mongoose = require("mongoose");

const hotelAvailabilitySchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotelm",
      required: true,
    },
    dayOfWeek: { type: String, required: true},
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HotelAvailability", hotelAvailabilitySchema);
