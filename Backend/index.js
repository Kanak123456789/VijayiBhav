const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const router = express.Router();
const brevo = require('@getbrevo/brevo');
require('dotenv').config();
require('./config/passport');
const StudentModel = require('./models/Students');

const app = express();

 

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
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

mongoose.connect('mongodb://localhost:27017/vvcc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Login route
app.post('/login', (req, res) => {
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

// Register route

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await StudentModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email Already Exists' });
    }

    const newUser = new StudentModel({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.post('/check-email', async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await StudentModel.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: 'Email Already Exists' });
    }
    res.status(200).json({ message: 'Email Available' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});



// Logout route
app.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ status: "Error logging out", error: err.message });
    }
    res.json({ status: "Logged out successfully" });
  });
});

// Current user route
app.get('/current_user', async (req, res) => {
  if (req.isAuthenticated()) {
    let result = await StudentModel.findOne({ email: req.user.email });
    console.log("User Info: ", result);
    res.json(req.user);
  } else {
    res.json(null);
  }
});
 

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('http://localhost:3000/dashboard');
});

module.exports = router;

 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
