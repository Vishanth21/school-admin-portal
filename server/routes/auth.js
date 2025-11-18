const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

module.exports = function(db) {
  const usersCollection = db.collection('users');
  
  router.get('/test', (req, res) => {
    res.json({ message: 'Auth route working!' });
  });

  router.post('/signup', async (req, res) => {
    try {
      console.log('Signup request:', req.body);
      
      const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      const role = 'admin';
      
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = {
        name,
        email,
        password: hashedPassword,
        role,
        createdAt: new Date()
      };
      
      const result = await usersCollection.insertOne(newUser);
      const user = { 
        _id: result.insertedId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt
      };
      
      // Generate token
      const token = jwt.sign(
        { userId: user._id.toString(), role: user.role },
        process.env.JWT_SECRET || 'school_secret',
        { expiresIn: '24h' }
      );
      
      res.status(201).json({
        message: 'User created successfully',
        token,
        user
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      console.log('Login request:', req.body);
      
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      const user = await usersCollection.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin access only.' });
      }
      
      const token = jwt.sign(
        { userId: user._id.toString(), role: user.role },
        process.env.JWT_SECRET || 'school_secret',
        { expiresIn: '24h' }
      );
      
      const userData = { 
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      };
      
      res.json({
        message: 'Login successful',
        token,
        user: userData
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  
  return router;
};