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

// --- UPDATED MIDDLEWARE ---
app.use(express.json());

// Strict CORS: Replace the URL with your actual Vercel Frontend URL later
app.use(cors({
  origin: ["http://localhost:5173", "https://ethio-aesthetics.vercel.app"], 
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

// --- DATABASE CONNECTION ---
// Vercel optimization: use a variable to cache the connection
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log('🛡️ VAULT CONNECTED');
  } catch (err) {
    console.log('❌ CONNECTION ERROR:', err);
  }
};

// Middleware to ensure DB is connected before handling any request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// --- ROUTES ---

// HEARTBEAT
app.get('/', (req, res) => {
  res.status(200).json({ status: "Operational", project: "EthioAesthetics" });
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
    if (decoded.role !== 'admin') return res.status(403).json({ msg: "Admin only" });
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};

// --- AUTH PROTOCOLS ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ success: false, msg: "Identity already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ fullName, email, password: hashedPassword, role: 'client' });
    await user.save();
    res.status(201).json({ success: true, token: generateToken(user), user: { name: user.fullName, role: user.role } });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, msg: 'IDENTITY REJECTED' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, msg: 'INVALID ACCESS KEY' });
    res.json({ success: true, token: generateToken(user), user: { name: user.fullName, role: user.role } });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- LEADS ---
app.post('/api/leads', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    await newLead.save();
    res.status(201).json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/leads', adminAuth, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.patch('/api/leads/:id', adminAuth, async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updatedLead);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/leads/:id', adminAuth, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ msg: "Data Expunged" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- USERS ---
app.get('/api/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.patch('/api/users/:id/role', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-password');
    res.json(user);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/users/:id', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "Personnel removed" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- VERCEL EXPORT ---
// Local development still uses app.listen, but Vercel needs the exported module.
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 LOCAL CMD CENTER: ${PORT}`));
}

module.exports = app;