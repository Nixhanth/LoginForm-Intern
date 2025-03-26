const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    user.isActive = true;
    await user.save();

    const token = jwt.sign({ id: user._id }, 'secretKey');
    res.json({ token });
});

// Logout
router.post('/logout', async (req, res) => {
    const { email } = req.body;
    await User.findOneAndUpdate({ email }, { isActive: false });

    res.json({ message: 'User logged out successfully' });
});

// Get Active Users Count
router.get('/stats', async (req, res) => {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });

    res.json({ totalUsers, activeUsers });
});

module.exports = router;
