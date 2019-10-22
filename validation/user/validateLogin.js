const _ = require("lodash");
const validator = require("validator");
const { User } = require("../../models/User");

const validateLogin = async data => {
  let errors = {};

  //email
  data.email = _.get(data, "email", "");
  data.password = _.get(data, "password", "");

  if (validator.isEmpty(data.email)) {
    errors.email = "Xin hãy nhập email vào!";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "email không đúng";
  } else {
    const user = await User.findOne({ email: data.email });
    if (!user) errors.email = "email không tồn tại";
  }

  //password
  if (validator.isEmpty(data.password)) {
    errors.password = "mật khẩu là bắt buộc";
  }

  return {
    isValid: _.isEmpty(errors),
    errors
  };
};

module.exports = {
  validateLogin
};
