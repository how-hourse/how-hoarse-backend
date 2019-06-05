const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('user', () => {
  
  it('hashes the password at user creation', () => {
    return User.create({
      name: 'beef taco 69',
      password: 'pw1234',
      email: 'person@gmail.com'
    })
      .then(user => {
        expect(user.toJSON()).toEqual({
          name: 'beef taco 69',
          email: '1234567890',
          _id: expect.any(mongoose.Types.ObjectId),
        });
      });
  });

});
