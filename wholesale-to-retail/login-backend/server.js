require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wholesalt_to_retail_signup';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Schemas and Models
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['consumer', 'producer'], required: true },
});

const User = mongoose.model('User', userSchema);

// Utility functions
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '2h' });
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// API Routes
app.post('/:role/signup', async (req, res) => {
  const { role } = req.params;
  const { name, state, email, contact, password } = req.body;

  if (!['consumer', 'producer'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  if (!name || !state || !email || !contact || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ name, state, email, contact, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} signed up successfully` });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

app.post('/:role/login', async (req, res) => {
  const { role } = req.params;
  const { email, password } = req.body;

  if (!['consumer', 'producer'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} logged in successfully`,
      token,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
