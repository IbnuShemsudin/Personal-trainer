const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  program: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Pending, Contacted, Enrolled
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', LeadSchema);