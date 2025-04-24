const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define schema matching the gate pass structure
const GatePassSchema = new mongoose.Schema({
  party: String,
  broker: String,
  date: String,
  vehicleNumber: String, // ✅ ADD THIS LINE
  totalQtl: String,
  totalPrice: String,
  items: [
    {
      brand: String,
      bags: Number,
      bagWeight: Number,
      rate: Number
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


// Create a model
const GatePass = mongoose.model('GatePass', GatePassSchema);

// POST route to save gate pass
router.post('/gatepass', async (req, res) => {
  try {
    const newGatePass = new GatePass(req.body);
    await newGatePass.save();
    res.json({ message: '✅ Gate pass saved', data: newGatePass });
  } catch (err) {
    console.error('❌ Error saving gate pass:', err);
    res.status(500).json({ message: 'Error saving gate pass', error: err });
  }
});

// GET route (optional) to fetch all gate passes
router.get('/gatepass', async (req, res) => {
  try {
    const allPasses = await GatePass.find().sort({ createdAt: -1 });
    res.json({ data: allPasses });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching gate passes', error: err });
  }
});


module.exports = router;
