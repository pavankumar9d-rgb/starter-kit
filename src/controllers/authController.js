const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/database');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

async function register(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

    const password_hash = await bcrypt.hash(password, 10);
    const [userId] = await db('users').insert({ username, password_hash });

    const token = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ message: 'User registered', token });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      return res.status(400).json({ error: 'Username already exists' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await db('users').where({ username }).first();

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ message: 'Login successful', token, user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
}

module.exports = { register, login };
