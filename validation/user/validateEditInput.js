const _ = require("lodash");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/User");

const validateEditInput = async (data, userEmail) => {
  let errors = {};

  data.name = _.get(data, "name", "");
  data.email = _.get(data, "email", "");
  data.gender = _.get(data, "gender", "");
  data.bloodType = _.get(data, "bloodType", "");
  data.personalCard = _.get(data, "personalCard", "");
  data.personalCardLocation = _.get(data, "personalCardLocation", "");
  data.address = _.get(data, "address", "");
  data.phone = _.get(data, "phone", "");

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
    if (user) {
      if (user.email !== userEmail) {
        errors.email = "email đã tồn tại";
      }
    }
  }

  //gender
  if (validator.isEmpty(data.gender)) {
    errors.gender = "hãy chọn giới tính";
  }

  //bloodType
  if (validator.isEmpty(data.bloodType)) {
    errors.bloodType = "hãy chọn nhóm máu";
  }
  //personalCard
  if (validator.isEmpty(data.personalCard)) {
    errors.personalCard = "hãy nhập số CMND";
  }
  //personalCardLocation
  if (validator.isEmpty(data.personalCardLocation)) {
    errors.personalCardLocation = "hãy nhập nơi cấp CMND";
  }
  //address
  if (validator.isEmpty(data.address)) {
    errors.address = "hãy nhập địa chỉ";
  }
  //phone
  if (validator.isEmpty(data.phone)) {
    errors.phone = "hãy nhập số điện thoại";
  }

  //password
  // if (validator.isEmpty(data.password)) {
  //   errors.password = "mật khẩu là bắt buộc";
  // } else if (!validator.isLength(data.password, { min: 8 })) {
  //   errors.password = "mật khẩu có ít nhất là 8 ký tự";
  // }

  return {
    isValid: _.isEmpty(errors),
    errors
  };
};

//data la 1 object

module.exports = {
  validateEditInput
};
