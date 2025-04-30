require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const creditRoutes = require('./routes/credit');
const feedRoutes = require('./routes/feed');
const postRoutes = require('./routes/post');
const dashboardRoutes = require('./routes/dashboard');
const userRoutes = require('./routes/user');

const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/credit', creditRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/post', postRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/user', userRoutes);

// Use process.env.PORT or default to 8080 for Cloud Run
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI).then(() => {
 console.log("Database connected");
});
