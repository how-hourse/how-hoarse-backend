const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
}, { versionKey: false });

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
