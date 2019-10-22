const _ = require("lodash");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/User");

const validateEditInput = async data => {
  let errors = {};

  data.body.name = _.get(data.body, "name", "");
  data.body.email = _.get(data.body, "email", "");
  // data.body.password = _.get(data.body, "password", "");
  // data.body.password2 = _.get(data.body, "password2", "");
  // data.body.DOB = _.get(data.body, "DOB", "");
  data.body.gender = _.get(data.body, "gender", "");
  data.body.bloodType = _.get(data.body, "bloodType", "");

  //name
  if (validator.isEmpty(data.body.name)) {
    errors.name = "tên là bắt buộc";
  }
  //email
  if (validator.isEmpty(data.body.email)) {
    errors.email = "email là bắt buộc";
  } else if (!validator.isEmail(data.body.email)) {
    errors.email = "email không đúng";
  } else {
    const { token } = data.headers;
    var loggedEmail;
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        loggedEmail = decoded.email;
      }
    });
    const user = await User.findOne({ email: data.body.email });
    if (user) {
      if (user.email !== loggedEmail) {
        errors.email = "email đã tồn tại";
      }
    }
  }

  //gender
  if (validator.isEmpty(data.body.gender)) {
    errors.gender = "hãy chọn giới tính";
  }

  //bloodType
  if (validator.isEmpty(data.body.bloodType)) {
    errors.bloodType = "hãy chọn nhóm máu";
  }

  //password
  // if (validator.isEmpty(data.body.password)) {
  //   errors.password = "mật khẩu là bắt buộc";
  // } else if (!validator.isLength(data.body.password, { min: 8 })) {
  //   errors.password = "mật khẩu có ít nhất là 8 ký tự";
  // }

  return {
    isValid: _.isEmpty(errors),
    errors
  };
};

//data.body la 1 object

module.exports = {
  validateEditInput
};
