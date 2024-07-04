const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('./config/passport');

const authRoutes = require('./routes/auth');
const StudentModel = require('./models/Students');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(session({
  secret: '1234567890qwertyuiop',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/vvcc");

app.use('/auth', authRoutes);

app.post('/Login', (req, res) => {
  const { email, password } = req.body;
  StudentModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          req.login(user, (err) => {
            if (err) {
              return res.status(500).json({ status: "Error logging in", error: err.message });
            }
            res.json({ status: "Success", user });
          });
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
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ status: "Error logging out", error: err.message });
    }
    res.json({ status: "Logged out successfully" });
  });
});


app.get('/current_user', async (req, res) => {
  if (req.isAuthenticated()) {
    // console.log(req);
    let result = await StudentModel.find({email : req.user.email});
    console.log("mera console" , result);
    res.json(req.user);
  } else {
    res.json(null);
  }
});


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
