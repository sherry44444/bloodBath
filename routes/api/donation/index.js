const express = require("express");
const router = express.Router();
const donationController = require("./controller");
const { authenticate, authorize } = require("../../../middlewares/auth");

router.post("/", authenticate, donationController.createDonation);
// router.get("/", donationController.getDonations);
router.get("/", authenticate, donationController.getLoggedUserDonation);
router.get("/:donationId", donationController.getDonationById);
router.delete("/:donationId", authenticate, donationController.deleteDonation);
router.put("/:donationId", authenticate, donationController.updateDonationById);
router.put(
  "/finish-donation/:donationId",
  authenticate,
  donationController.finishDonation
);

module.exports = router;
