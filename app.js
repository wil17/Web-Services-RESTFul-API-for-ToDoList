const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);

// Database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database berhasil terhubung.');
  })
  .catch((err) => {
    console.error('Tidak dapat terhubung ke database:', err);
  });

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});