const { User } = require('../models');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Implementasi logika registrasi disini
    await User.create({ username, password });
    res.status(201).json({ message: 'Register user berhasil.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Implementasi logika login disini
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const token = jwt.sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { register, login };
