const _ = require("lodash");
const validator = require("validator");
const { User } = require("../../models/User");

const validatePostDonation = data => {
  let errors = {};

  data.location = _.get(data, "location", "");
  data.donationTime = _.get(data, "donationTime", "");

  if (validator.isEmpty(data.location)) {
    errors.location = "xin hãy chọn địa điểm";
  }

  if (validator.isEmpty(data.donationTime)) {
    errors.donationTime = "xin hãy chọn thời gian định sẵn theo lịch";
  }

  return {
    isValid: _.isEmpty(errors),
    errors
  };
};

module.exports = {
  validatePostDonation
};
