const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  program: { type: String, required: true },
  goals: { type: String, default: "" }, 
  status: { 
    type: String, 
    default: 'Pending',
    enum: ['Pending', 'Contacted', 'Enrolled'] 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Lead', LeadSchema);