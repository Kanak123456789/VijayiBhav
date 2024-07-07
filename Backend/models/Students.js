const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  password: String,
  googleId:String,
  image:String
});

const StudentModel = mongoose.model("Register", StudentSchema);
module.exports = StudentModel;
