const express = require("express");
const userController = require("./controller");
const { authenticate, authorize } = require("../../../middlewares/auth");
const router = express.Router();
const { uploadImage } = require("../../../middlewares/uploadImage");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);
router.put("/:id", authenticate, userController.updateUserById);
router.delete("/:id", authenticate, userController.deleteUserById);

router.post("/login", userController.login);

router.post(
  "/upload-avatar/:id",
  uploadImage("avatar"),
  userController.uploadAvatar
);

module.exports = router;
