const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password_hash: hashedPassword,
    });

    const token = jwt.sign({ userID: newUser.user_id }, process.env.JWT_SECRET, { expiresIn: '365d' });

    res.status(201).json({ message: 'User registered successfully', token, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !await bcrypt.compare(password, user.password_hash)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userID: user.user_id }, process.env.JWT_SECRET, { expiresIn: '365d' });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

module.exports = { register, login };
