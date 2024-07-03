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
          res.json({ status: "Success", user });
        } else {
          res.json({ status: "The Password is Incorrect" });
        }
      } else {
        res.json({ status: "No Record Exist" });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/Register', (req, res) => {
  StudentModel.create(req.body)
    .then(student => res.json(student))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/Logout', (req, res) => {
  const { email } = req.body;
  StudentModel.deleteOne({ email: email })
    .then(() => res.json({ status: "Logged out and user data deleted" }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(5000, () => {
  console.log("Server is Running on port 5000");
});
