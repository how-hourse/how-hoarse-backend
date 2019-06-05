require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const User = require('../../lib/models/User');

describe('user', () => {
  beforeAll(() => {
    return connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('hashes the password at user creation', () => {
    return User.create({
      name: 'beef taco 69',
      password: 'pw1234',
      email: 'person@gmail.com'
    })
      .then(user => {
        expect(user.toJSON()).toEqual({
          name: 'beef taco 69',
          email: 'person@gmail.com',
          _id: expect.any(mongoose.Types.ObjectId),
        });
      });
  });

});
