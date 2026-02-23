require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const Lead = require('./models/Lead');
const User = require('./models/User');

const app = express();

// --- MIDDLEWARE ---
app.use(express.json());
app.use(cors());

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🛡️  VAULT CONNECTED: MongoDB Link Established'))
  .catch(err => console.log('❌ CONNECTION ERROR:', err));

// --- HEARTBEAT ROUTE ---
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: "Operational", 
    message: "EthioAesthetics Backend is Online",
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

// --- JWT HELPER ---
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' }
  );
};

// --- AUTH MIDDLEWARE ---
const adminAuth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ msg: "Admin authorization required" });
    }
    
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// --- 1. AUTH PROTOCOLS (Register/Login) ---

app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ success: false, msg: "Identity already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ fullName, email, password: hashedPassword, role: 'client' });

    await user.save();
    res.status(201).json({ 
      success: true, 
      token: generateToken(user),
      user: { name: user.fullName, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, msg: 'IDENTITY REJECTED' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, msg: 'INVALID ACCESS KEY' });

    res.json({
      success: true,
      token: generateToken(user),
      user: { name: user.fullName, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 2. PUBLIC LEAD ACQUISITION ---
app.post('/api/leads', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    await newLead.save();
    console.log("📥 New Lead Acquired:", newLead.fullName);
    res.status(201).json({ success: true, msg: "Deployment Successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 3. PRIVATE LEADS MANAGEMENT (ADMIN ONLY) ---

app.get('/api/leads', adminAuth, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/leads/:id', adminAuth, async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    );
    res.json(updatedLead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/leads/:id', adminAuth, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ msg: "Data Expunged" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 4. PERSONNEL MANAGEMENT (ADMIN ONLY) ---

app.get('/api/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/users/:id/role', adminAuth, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['admin', 'client'].includes(role)) {
      return res.status(400).json({ msg: "Invalid role" });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:id', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "Personnel removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 COMMAND CENTER ONLINE: PORT ${PORT}`));