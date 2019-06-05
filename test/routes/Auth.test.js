require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const request = require('supertest');
const app = require('../../lib/app');

describe('auth route tests', () => {

  beforeAll(() => {
    return connect();
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  const userAgent = request.agent(app);
  beforeEach(() => {
    return userAgent
      .post('/api/v1/auth/signup')
      .send({ name: 'Anna', email: 'person@gmail.com', password: 'password' });
  });

  it('signs up an user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ name: 'taco dan', password: 'sneakyPhrase32', email: 'person@gmail.com' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'taco dan', 
          email: 'person@gmail.com',
          _id: expect.any(String)
        });
      });
  });

  it('signs in a user', () => {
    return request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'person@gmail.com', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: expect.any(String),
          email: 'person@gmail.com'
        });
      });
  });

  it('errors on signin with non existing acc', () => {
    return request(app)
      .post('/api/v1/auth/signin')
      .send({ email: '2345678901', password: 'sneakyPhrase32' })
      .then(res => {
        expect(res.body).toEqual({
          status: 401
        });
      });
  });

  it('errors on signin with bad password', () => {
    return request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'person@gmail.com', password: 'password12' })
      .then(res => {
        expect(res.body).toEqual({
          status: 401
        });
      });
  });

});
