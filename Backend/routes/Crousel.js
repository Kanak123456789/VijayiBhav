const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const router = express.Router();


const carouselSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  label: { type: String, required: true },
  text: { type: String, required: true },
});

const CarouselItem = mongoose.model('CarouselItem', carouselSchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'crousel_img/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Route to add new carousel item
router.post('/add-carousel-item', upload.single('image'), async (req, res) => {
  const { label, text } = req.body;
  // const imageUrl = `..Backend/crousel_img/${req.file.filename}`;
  const imageUrl = `http://localhost:5000/crousel_img/${req.file.filename}`;
  const newItem = new CarouselItem({ imageUrl, label, text });
  await newItem.save();
  res.json(newItem);
});

// Route to get all carousel items
router.get('/carousel-items', async (req, res) => {
  const items = await CarouselItem.find();
  console.log(items);
  res.json(items);
});

module.exports = router;
