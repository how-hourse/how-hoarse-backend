const { Router } = require('express');
const Score = require('../models/Score');
const { ensureAuth } = require('../middleware/ensure-auth');


module.exports = Router()
  .post('/newscore', ensureAuth, async(req, res, next) => {
    try {
      const { user, score } = req.body;
      const newScore = await Score 
        .create({ user, score });

      res.send(newScore);
    } catch(error) {
      next(error);
    }
  });

