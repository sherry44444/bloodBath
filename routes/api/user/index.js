const express = require("express");
const userController = require("./controller");
const { authenticate, authorize } = require("../../../middlewares/auth");
const router = express.Router();
const { uploadImage } = require("../../../middlewares/uploadImage");

router.get("/all", userController.getUsers);
router.get("/", authenticate, userController.getUser);
router.post("/", userController.createUser);
router.put("/", authenticate, userController.editUser);
router.delete("/", authenticate, userController.deleteUser);
router.post("/login", userController.login);

router.post(
  "/upload-avatar",
  uploadImage("avatar"),
  authenticate,
  userController.uploadAvatar
);

module.exports = router;
