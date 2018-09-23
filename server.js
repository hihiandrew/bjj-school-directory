const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const morgan = require('morgan');
const { db, seed, School, Student } = require('./db');

server.use(morgan('dev'));
server.use(express.static(path.join(__dirname, 'public')));
server.use('/dist', express.static(path.join(__dirname, 'dist')));

db.sync({ force: true })
  .then(() => {
    console.log('Database synced');
    seed();
  })
  .then(() => {
    server.listen(PORT, () => {
      `Listening on port: ${PORT}`;
    });
  })
  .catch(e => console.log(e));
