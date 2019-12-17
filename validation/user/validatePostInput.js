const _ = require("lodash");
const validator = require("validator");
const { User } = require("../../models/User");

const validatePostInput = async data => {
  let errors = {};

  data.name = _.get(data, "name", "");
  data.email = _.get(data, "email", "");
  data.password = _.get(data, "password", "");
  data.confirmPassword = _.get(data, "confirmPassword", "");
  data.DOB = _.get(data, "DOB", "");
  data.gender = _.get(data, "gender", "");
  data.bloodType = _.get(data, "bloodType", "");
  data.personalCard = _.get(data, "personalCard", "");
  data.personalCardLocation = _.get(data, "personalCardLocation", "");
  data.address = _.get(data, "address", "");
  data.phone = _.get(data, "phone", "");
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

  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "xin hãy xác nhận lại mật khẩu";
  } else if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "mật khẩu xác nhận không khớp";
  }

  //DOB
  if (validator.isEmpty(data.DOB)) {
    errors.DOB = "ngày tháng năm sinh là bắt buộc";
  }

  //bloodType
  if (validator.isEmpty(data.bloodType)) {
    errors.bloodType = "xin hãy chọn nhóm máu của bạn";
  }

  //gender
  if (validator.isEmpty(data.gender)) {
    errors.gender = "xin hãy chọn giới tính";
  }
  //personalCard
  if (validator.isEmpty(data.personalCard)) {
    errors.personalCard = "xin hãy nhập số CMND";
  }
  if (/[^0-9]/.test(data.personalCard)) {
    errors.personalCard = "số CMND không đúng";
  }
  //personalCardLocation
  if (validator.isEmpty(data.personalCardLocation)) {
    errors.personalCardLocation = "xin hãy nhập nơi cấp CMND";
  }
  //address
  if (validator.isEmpty(data.address)) {
    errors.address = "xin hãy nhập địa chỉ";
  }
  //phone
  if (validator.isEmpty(data.phone)) {
    errors.phone = "xin hãy nhập số điện thoại";
  }
  if (/[^0-9]/.test(data.phone)) {
    errors.phone = "số điện thoại không đúng";
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
