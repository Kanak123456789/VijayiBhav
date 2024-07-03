const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const StudentModel = require('./models/Students');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/vvcc");

app.post('/Login', (req, res) => {
  const { email, password } = req.body;
  StudentModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("The Password is Incorrect");
        }
      } else {
        res.json("No Record Exist");
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/Register', (req, res) => {
  const { email } = req.body;
  StudentModel.findOne({ email: email })
    .then(user => {
      if (user) {
        res.json("Email Already Exists");
      } else {
        StudentModel.create(req.body)
          .then(student => res.json("Registration Successful"))
          .catch(err => res.status(500).json({ error: err.message }));
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(5000, () => {
  console.log("Server is Running on port 5000");
});
