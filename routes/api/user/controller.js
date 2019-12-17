const { User } = require("../../../models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {
  validatePostInput
} = require("../../../validation/user/validatePostInput");
const {
  validateEditInput
} = require("../../../validation/user/validateEditInput");
const { validateLogin } = require("../../../validation/user/validateLogin");
const jwt = require("jsonwebtoken");

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.json(err));
};

module.exports.createUser = async (req, res, next) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    DOB,
    bloodType,
    gender,
    personalCard,
    personalCardLocation,
    address,
    phone
  } = req.body;
  const newUser = new User({
    name,
    email,
    password,
    confirmPassword,
    DOB,
    bloodType,
    gender,
    personalCard,
    personalCardLocation,
    address,
    phone
  });
  //validation
  const { isValid, errors } = await validatePostInput(req.body);
  if (!isValid) return res.status(400).json(errors);
  //hash password

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.json(err);
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return res.json(err);
      newUser.password = hash;

      newUser
        .save()
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => console.log(err));
    });
  });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!user)
        () => Promise.reject({ status: 404, message: "user not found" });
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(err.status).json({ message: err.message });
    });
};

module.exports.editUser = async (req, res, next) => {
  // validation;
  const { isValid, errors } = await validateEditInput(req.body, req.user.email);
  if (!isValid) return res.status(400).json(errors);

  User.findById(req.user.id)
    .then(user => {
      if (!user) () => Promise.reject({ status: 404, message: "not found" });
      const {
        name,
        email,
        bloodType,
        gender,
        DOB,
        personalCard,
        personalCardLocation,
        address,
        phone
      } = req.body;

      user.name = name;
      user.email = email;
      user.bloodType = bloodType;
      user.gender = gender;
      user.DOB = DOB;
      user.personalCard = personalCard;
      user.personalCardLocation = personalCardLocation;
      user.address = address;
      user.phone = phone;

      return user.save();
    })
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(err => {
      if (!err.status) res.json(err);
      res.status(err.status).json(err.message);
    });
};

module.exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.user.id })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));
};

module.exports.login = async (req, res, next) => {
  //validate
  const { isValid, errors } = await validateLogin(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "user not found" });

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) return res.status(400).json({ password: "Sai mật khẩu" });

        const payload = {
          id: user._id,
          email: user.email,
          bloodType: user.bloodType
        };

        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) res.json(err);
            res.status(200).json({
              success: true,
              token
            });
          }
        );
      });
    })
    .catch(err => {
      if (!err.status) res.json(err);
      res.status(err.status).json(err.message);
    });
};

module.exports.uploadAvatar = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!user) return Promise.reject({ status: 404, message: "Not found" });

      user.avatar = req.file.path;
      return user.save();
    })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      if (!err.status) return res.json(err);
      res.status(200).json({ messgage: err.message });
    });
};
