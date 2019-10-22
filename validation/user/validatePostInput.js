const _ = require("lodash");
const validator = require("validator");
const { User } = require("../../models/User");

const validatePostInput = async data => {
  let errors = {};

  data.name = _.get(data, "name", "");
  data.email = _.get(data, "email", "");
  data.password = _.get(data, "password", "");
  data.password2 = _.get(data, "password2", "");
  data.DOB = _.get(data, "DOB", "");
  data.gender = _.get(data, "gender", "");
  data.bloodType = _.get(data, "bloodType", "");
  //gom 2 truong hop undefined va rong ve lam 1 la` string rong~

  //name
  if (validator.isEmpty(data.name)) {
    errors.name = "tên là bắt buộc";
  }
  //email
  if (validator.isEmpty(data.email)) {
    errors.email = "email là bắt buộc";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "email không đúng";
  } else {
    const user = await User.findOne({ email: data.email });
    if (user) errors.email = "email đã tồn tại";
  }

  //password
  if (validator.isEmpty(data.password)) {
    errors.password = "mật khẩu là bắt buộc";
  } else if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = "mật khẩu có ít nhất là 8 ký tự";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "xin hãy xác nhận lại mật khẩu";
  } else if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "mật khẩu xác nhận không khớp";
  }

  //DOB
  if (validator.isEmpty(data.DOB)) {
    errors.DOB = "ngày tháng năm sinh là bắt buộc";
  }

  //bloodType
  if (validator.isEmpty(data.bloodType)) {
    errors.bloodType = 'xin hãy chọn nhóm máu của bạn (hoặc chọn "chưa biết")';
  }

  //gender
  if (validator.isEmpty(data.gender)) {
    errors.gender = "xin hãy chọn giới tính";
  }

  return {
    isValid: _.isEmpty(errors),
    errors
  };
};

//data la 1 object

module.exports = {
  validatePostInput
};
