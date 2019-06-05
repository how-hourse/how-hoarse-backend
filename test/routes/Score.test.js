require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const request = require('supertest');
const app = require('../../lib/app');


describe('score routes', () => {

  beforeAll(() => {
    return connect();
  });
  
  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('posts a new score', () =>{
    const agent = request.agent(app);

    return agent
      .post('/api/v1/auth/signup')
      .send({ name: 'taco dan', password: 'sneakyPhrase32', email: 'person@gmail.com' })
      .then(() => {
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
  });
});

