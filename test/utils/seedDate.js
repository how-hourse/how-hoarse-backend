const chance = require('chance').Chance();
const User = require('../../lib/models/User');
const Score = require('../../lib/models/Score');

function seedUsers(userCount = 20) {
  const users = [...Array(userCount)].map(() => ({
    name: chance.name(),
    password: 'password123',
    email: chance.email(),
  }));
  return User.create(users);
}

async function seedScores(scoreCount = 20) {
  const users = await seedUsers();
  const scores = [...Array(scoreCount)].map((_, i) => ({
    user: users[i]._id,
    score: chance.natural({ max: 50 })
  }));
  return Score.create(scores);
}

module.exports = seedScores;
