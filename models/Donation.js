const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  location: String,
  donationTime: String,
  isFinished: { type: Boolean, default: false }
});

const Donation = mongoose.model("Donation", DonationSchema, "Donation");

module.exports = {
  DonationSchema,
  Donation
};
