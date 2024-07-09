const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const StudentModel = require("./models/Students"); 
require("dotenv").config();
require("./config/passport");  
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const otps = new Map(); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // your email
    pass: process.env.EMAIL_PASSWORD, // your email password
  },
});


const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(
  session({
    secret: "1234567890qwertyuiop",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect("mongodb://127.0.0.1:27017/vvcc")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Login route

app.post("/Login", (req, res) => {
  const { email, password } = req.body;
  StudentModel.findOne({ email: email })
    .then((user) => {
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
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Register route
app.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const existingUser = await StudentModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "Error in mail", message: "Email Already Exists" });
    }

    const newUser = new StudentModel({ name, email, phone, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/forgetpassword", async (req, res) => {
  const { email } = req.body;
   console.log(email)
  try {
    const user = await StudentModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: "Error in mail", message: "User not found" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    otps.set(email, otp);

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      
      if (error) {
      
        return res.status(500).json({ status: "Error", message: error});
      }
      res.json({ status: "Success", message: "OTP sent to email" });
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/verifyotp", (req, res) => {
  const { email, otp, newPassword } = req.body;

  const storedOtp = otps.get(email);
  if (storedOtp !== otp) {
    return res.status(400).json({ status: "Invalid OTP", message: "Invalid OTP" });
  }

  StudentModel.updateOne(
    { email },
    { $set: { password: newPassword } }
  )
    .then(data => {
      if (data.modifiedCount === 1) {
        otps.delete(email); 
        res.json({ status: "Success", message: "Password updated successfully" });
      } else {
        res.status(500).json({ status: "Error", message: "Password update failed" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Server error", error });
    });
});


// Logout route
app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "Error logging out", error: err.message });
    }
    res.json({ status: "Logged out successfully" });
  });
});

// Current user route
app.get("/current_user", async (req, res) => {
  if (req.isAuthenticated()) {
    let result = await StudentModel.findOne({ email: req.user.email });
    console.log("User Info: ", result);
    res.json(req.user);
  } else {
    res.json(null);
  }
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
