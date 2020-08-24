const mongoose = require("mongoose");

const formDataSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A user must have a first name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "A user must have a last name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "A user must have a email address"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  occupation: {
    type: String,
  },
});

const formData = mongoose.model("formData", formDataSchema);
module.exports = formData;
