const { Router } = require('express');
const Score = require('../models/Score');
const { ensureAuth } = require('../middleware/ensure-auth');


module.exports = Router()
  .post('/newscore', ensureAuth, async(req, res, next) => {
    try {
      const { user, score } = req.body;
      const newScore = await Score 
        .create({ user, score });

      const scores = await Score.find()
        .lean()
        .populate('user');

      const sortedMaped = scores.sort(function compareNumbers(a, b) {
        return a.score - b.score;
      }).reverse().map(score => {
        return ({ score: score.score, _id: newScore._id._id });
      });

      console.log(sortedMaped);


      const place = sortedMaped.findIndex(score => score._id === newScore._id._id);

      console.log(newScore);
      console.log(newScore._id);
      console.log(place);

      //  {
      //   _id: 5cf8603c27deb06dab88c0f4,
      //   user: {
      //     _id: 5cf8603b27deb06dab88c0e0,
      //     name: 'Angel Young',
      //     email: 'ej@filud.is',
      //     passwordHash: '$2b$10$PCfddQ6c7MBS1pWCftXBOOmtMtsLQWLbUpnyWIuX/xSnMbTaU7ptq'
      //   },
      //   score: 1
      // }

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
  
