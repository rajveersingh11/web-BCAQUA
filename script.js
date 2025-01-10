const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bcaqua', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// News Schema
const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
});

const News = mongoose.model('News', newsSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/news', async (req, res) => {
  const news = await News.find();
  res.json(news);
});

app.post('/contact', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.status(201).send({ message: 'Message received!' });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));