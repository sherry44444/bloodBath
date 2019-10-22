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

//route: GET {host}/api/users
//get list of users
//acess: PUBLIC
module.exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.json(err));
};

//route:  POST {host}/api/users
//create new user
//access: PUBLIC

module.exports.createUser = async (req, res, next) => {
  const { name, email, password, password2, DOB, bloodType, gender } = req.body;
  const newUser = new User({
    name,
    email,
    password,
    password2,
    DOB,
    bloodType,
    gender
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

  //data = rq.body

  // newUser
  //   .save()
  //   .then(user => {
  //     res.status(200).json(user);
  //   })
  //   .catch(err => res.json(err));
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      if (!user)
        () => Promise.reject({ status: 404, message: "user not found" });
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(err.status).json({ message: err.message });
    });
};

module.exports.updateUserById = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "invalid id" });

  // validation;
  const { isValid, errors } = await validateEditInput(req);
  if (!isValid) return res.status(400).json(errors);

  User.findById(id)
    .then(user => {
      if (!user) () => Promise.reject({ status: 404, message: "not found" });
      const {
        name,
        email,
        // password,
        // password2,
        // DOB,
        bloodType,
        gender
      } = req.body;

      user.name = name;
      user.email = email;
      // user.password = password;
      // user.password2 = password2;
      // user.DOB = DOB;
      user.bloodType = bloodType;
      user.gender = gender;

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

module.exports.deleteUserById = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "invalid id" });
  User.deleteOne({ _id: id })
    .then(users => res.status(200).json(users))
    .catch(err => console.log(err));
};

module.exports.login = async (req, res, next) => {
  //validate
  const { isValid, errors } = await validateLogin(req.body);
  // console.log(isValid);
  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "User not found" });

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
  const { id } = req.params; // headers, params, body, file
  User.findById(id)
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
