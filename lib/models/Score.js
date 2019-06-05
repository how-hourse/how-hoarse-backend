const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: {
    type: Number,
    required: true
  }
}, { versionKey: false });

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
