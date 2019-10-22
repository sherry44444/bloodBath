const { Donation } = require("../../../models/Donation");
const mongoose = require("mongoose");
const {
  validatePostDonation
} = require("../../../validation/donation/validatePostDonation");

module.exports.createDonation = (req, res, next) => {
  const userId = req.user.id;

  const { location, donationTime } = req.body;

  //validation
  const { isValid, errors } = validatePostDonation(req.body);
  if (!isValid) return res.status(400).json(errors);

  const newDonation = new Donation({
    userId,
    location,
    donationTime
  });
  newDonation
    .save()
    .then(donation => {
      res.status(200).json(donation);
    })
    .catch(err => res.json(err));
};

module.exports.getLoggedUserDonation = (req, res, next) => {
  const userId = req.user.id;
  Donation.find({ userId: userId })
    .then(donations => {
      res.status(200).json(donations);
    })
    .catch(err => res.json(err));
};

module.exports.getDonations = (req, res, next) => {
  Donation.find()
    .then(donations => res.status(200).json(donations))
    .catch(err => res.json(err));
};

module.exports.getDonationById = (req, res, next) => {
  const { donationId } = req.params;
  Donation.findById(donationId)
    .populate("userId", "email")
    .then(donation => res.status(200).json(donation))
    .catch(err => res.json(err));
};

module.exports.updateDonationById = (req, res, next) => {
  const { donationId } = req.params;
  const { location, donationTime } = req.body;

  Donation.findById(donationId)
    .then(donation => {
      (donation.location = location), (donation.donationTime = donationTime);

      return donation.save();
    })
    .then(donation => res.status(200).json(donation))
    .catch(err => res.json(err));
};

module.exports.deleteDonation = (req, res, next) => {
  const { donationId } = req.params;
  Donation.deleteOne({ _id: donationId })
    .then(result => res.status(200).json(result))
    .catch(err => res.json(err));
};

module.exports.bookDonation = (req, res, next) => {
  // const passengerId = req.user.id; day moi lay passenger Id dung nha ve coi lai cai token de lay passengerId
  const { passengerId } = req.body;
  const { numberOfBookingSeats } = req.body;
  const { donationId } = req.params;
  console.log(params);
  Donation.findById(donationId)
    .then(donation => {
      if (donation.availableSeats < numberOfBookingSeats)
        return Promise({ status: 400, message: "not enough seats" });
      const passenger = {
        passengerId,
        numberOfBookingSeats
      };
      donation.passengers.push(passenger);
      donation.availableSeats = donation.availableSeats - numberOfBookingSeats;
      return donation.save();
    })
    .then(donation => res.status(200).json(donation))
    .catch(err => {
      if (!err.status) return res.json(err);
      res.status(err.status).json(err.message);
    });
};

module.exports.finishDonation = (req, res, next) => {
  const { donationId } = req.params;
  // console.log(req.params);
  Donation.findById(donationId)
    .then(donation => {
      donation.isFinished = true;
      return donation.save();
    })
    .then(donation => res.status(200).json(donation))
    .catch(err => {
      res.json(err);
      console.log(err);
    });
};
