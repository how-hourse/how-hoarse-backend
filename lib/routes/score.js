const { Router } = require('express');
const Score = require('../models/Score');

module.exports = Router()
  .post('/newscore', async(req, res, next) => {
    try {
      const { user, score } = req.body;
      const newScore = await Score 
        .create({ user, score });

      res.send(newScore);
    } catch(error) {
      next(error);
    }
  });

