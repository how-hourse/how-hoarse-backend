const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');

var cors = require('cors');

app.use(cors());
app.use(express.json());

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use('/api/v1/score', mongoConnection, require('./routes/score'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
