const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const roomBookingSchema = new mongoose.Schema(
  {
    user: { type: objectId, ref: "User", required: true },
    hotel: { type: objectId, ref: "Hotel", required: true },
    requestedDate: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"] },
    bookingTime: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RoomBooking", roomBookingSchema);
