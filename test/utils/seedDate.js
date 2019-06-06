const chance = require('chance').Chance();
const Score = require('../../lib/models/Score');

async function seedScores(scoreCount = 20) {
  const scores = [...Array(scoreCount)].map((_, i) => ({
    user: chance.name(),
    score: chance.natural({ max: 50 })
  }));
  return Score.create(scores);
}

module.exports = seedScores;
