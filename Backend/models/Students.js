const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  googleId:String,
  image:String
});

const StudentModel = mongoose.model("Register", StudentSchema);
module.exports = StudentModel;
