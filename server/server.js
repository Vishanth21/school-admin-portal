const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'school_portal';
let db;

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    
    initializeSampleData();
  })
  .catch(error => console.error('MongoDB connection error:', error));



async function initializeSampleData() {
  const usersCollection = db.collection('users');
  
  const sampleUsers = [
    { 
      email: 'admin@school.com', 
      name: 'Admin User', 
      role: 'admin', 
      password: 'password123'
    }
  ];

  for (const user of sampleUsers) {
    const exists = await usersCollection.findOne({ email: user.email });
    if (!exists) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await usersCollection.insertOne({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
        createdAt: new Date()
      });
      console.log(`Sample ${user.role} user created: ${user.email} / ${user.password}`);
    } else {
      console.log(`Sample ${user.role} user already exists: ${user.email}`);
    }
  }
}

app.post('/api/auth/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const role = 'admin';
    
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
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
    
    const result = await db.collection('users').insertOne(newUser);
    const user = { 
      _id: result.insertedId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt
    };
    
    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET || 'school_secret_key',
      { expiresIn: '24h' }
    );
    
    console.log('User created successfully:', user.email);
    res.status(201).json({
      message: 'User created successfully',
      token,
      user
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Login request received:', { 
      email: req.body.email
    });
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const user = await db.collection('users').findOne({ email });
    console.log('User found:', user ? { 
      email: user.email, 
      role: user.role,
      hasPassword: !!user.password 
    } : 'NO USER FOUND');
    
    if (!user) {
      console.log('No user found with email:', email);
      return res.status(400).json({ message: 'No account found with this email' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      console.log('Password incorrect for:', email);
      return res.status(400).json({ message: 'Incorrect password' });
    }
    
    if (user.role !== 'admin') {
      console.log('User is not an admin:', user.role);
      return res.status(403).json({ 
        message: 'Access denied. Admin access only.' 
      });
    }
    
    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET || 'school_secret_key',
      { expiresIn: '24h' }
    );
    
    const userData = { 
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    console.log('Login successful for:', user.email, 'as', user.role);
    res.json({
      message: 'Login successful',
      token,
      user: userData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!', 
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await db.collection('users').find({}).toArray();
    const safeUsers = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    res.json(safeUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'School Portal API Server is running!',
    endpoints: {
      test: '/api/test',
      login: '/api/auth/login',
      signup: '/api/auth/signup',
      users: '/api/users'
    },
    port: PORT
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Base URL: http://localhost:${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
});