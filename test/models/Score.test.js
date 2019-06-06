require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const Score = require('../../lib/models/Score');

describe('Score', () => {
  beforeAll(() => {
    return connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates score', () => {
    return Score.create({
      score: 42,
      user: 'jimmy' 
    })
      .then(score => {
        expect(score.toJSON()).toEqual({
          _id: expect.any(mongoose.Types.ObjectId),
          user: 'jimmy',
          score: 42
        });
      });
  });

});
