require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const request = require('supertest');
const app = require('../../lib/app');
const seedData = require('../utils/seedDate');


describe('score routes', () => {

  beforeAll(() => {
    return connect();
  });
  
  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });

  const agent = request.agent(app);
  beforeEach(() => {
    return agent
      .post('/api/v1/auth/signup')
      .send({ name: 'Anna', email: 'person@email.com', password: 'password' });
  });

  beforeEach(() => {
    return seedData();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('posts a new score', () =>{
    return agent
      .post('/api/v1/score/newscore')
      .send({ user: new mongoose.Types.ObjectId(), score: 200 })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: expect.any(String),
          score: 200
        });
      });
  });

  it('gets top 10 scores', () =>{
    return agent
      .get('/api/v1/score/topscores')
      .then(res => {
        expect(res.body).toEqual([
          expect.any(Object),
          expect.any(Object),
          expect.any(Object),
          expect.any(Object),
          expect.any(Object),
          expect.any(Object),
          expect.any(Object),
          expect.any(Object),
          expect.any(Object),
          expect.any(Object)
        ]);
      });
  });
});
