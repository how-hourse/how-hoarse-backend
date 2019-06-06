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
  })
  .get('/topscores', ensureAuth, async(req, res, next) => {
    try {
      const scores = await Score.find()
        .lean()
        .populate('user')
        .select({ _id: false });

      const topTen = topTenLean(scores);

      res.send(topTen);
    } catch(error) {
      next(error);
    }
  });


// takes found score objects, 
// orders them highest to lowest, 
// and only displays name and score
function topTenLean(objArr) {
  return objArr.sort(function compareNumbers(a, b) {
    return a.score - b.score;
  }).reverse().splice(0, 10).map(score => {
    return {
      name: score.user.name,
      score: score.score
    };
  });
}
  