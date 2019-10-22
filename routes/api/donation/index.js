const express = require("express");

const router = express.Router();
const donationController = require("./controller");
const { authenticate, authorize } = require("../../../middlewares/auth");

// const authenticate = (req, res, next) => {
//   const { jsonwebtoken } = req.headers;
//   jwt.veryfy(jsonwebtoken, "DIKEXE", (err, decoded) => {
//     if (err) return res.status(401).json({ message: "token invalid" });
//     if (decoded) return next();
//   });
// const {authenticate, authorize} = require()
// const{uploadImage} = require()

router.post(
  "/",
  authenticate,
  // authorize(["driver"]),
  donationController.createDonation
);
router.get("/", donationController.getDonations);
router.get(
  "/logged_in",
  authenticate,
  donationController.getLoggedUserDonation
);
router.get("/:donationId", donationController.getDonationById);
router.delete(
  "/:donationId",
  authenticate,
  // authorize(["driver", "admin"]),
  donationController.deleteDonation
);
router.put(
  "/:donationId",
  authenticate,
  // authorize(["driver"]),
  donationController.updateDonationById
);
router.put(
  "/book-donation/:donationId",
  authenticate,
  authorize(["passenger"]),
  donationController.bookDonation
);
router.put(
  "/finish-donation/:donationId",
  authenticate,
  // authorize(["driver"]),
  donationController.finishDonation
);

module.exports = router;
