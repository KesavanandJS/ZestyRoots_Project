const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb://127.0.0.1:27017/Contact-Info';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  state: String,
  purpose: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Route to handle contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, phone, state, purpose } = req.body;

  try {
    await Contact.create({ name, phone, state, purpose });
    res.status(201).json({ message: 'Contact details saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save contact details' });
  }
});

// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
