const mongoose = require("mongoose");
// const moment = require("moment");

//user schema
const userSchema = {
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
  dateOfBilling: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: 0,
    required: true,
  },
};

//creating new model as User in contact_management collection
module.exports = mongoose.model("user", userSchema);
