const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', async(req, res, next) => {
    try {
      const { name, password, email } = req.body;
      const user = await User 
        .create({ name, password, email });
      const token = await user.authToken();
      res.cookie('session', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });

      const untokenized = await User.findByToken(token);
      res.send(untokenized);
    } catch(error) {
      next(error);
    }
  })

  .post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    User
      .signIn(email, password)
      .then(result => {
        if(!result) {
          const error = new Error('Invalid login');
          error.status = 401;
          res.send(error);
          return next(error);
        }
        const { token } = result;
        res.cookie('session', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        });
        User.findByToken(token)
          .then(untokenized => res.send(untokenized));
      })
      .catch(next);
  });
