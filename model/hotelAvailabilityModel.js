const mongoose = require("mongoose");

const hotelAvailabilitySchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    dayOfWeek: { type: String, required: true },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
  },
  { timestamps: true }
);

module.export = mongoose.model("HotelAvailability", hotelAvailabilitySchema);
