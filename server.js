const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const { db, seed } = require('./db');

//server logging middleware
server.use(morgan('dev'));

//body parser middleware
server.use(bodyParser.json());

//serving public folder
server.use(express.static(path.join(__dirname, 'public')));
server.use('/dist', express.static(path.join(__dirname, 'dist')));

//session authentication middleware
server.use(
  session({
    secret: 'kimura',
    resave: false,
    saveUnitialized: false,
  })
);

//routes
server.use('/api', require('./routes/api'));
server.use('/schools', require('./routes/schools'));
server.use('/students', require('./routes/students'));
server.use('/auth', require('./routes/auth'));

//server sync and seed
db.sync({ force: true })
  .then(() => {
    console.log('Database synced');
    seed();
  })
  .then(() => {
    console.log('Database seeded');
    server.listen(PORT, () => {
      `Listening on port: ${PORT}`;
    });
  })
  .catch(e => console.log(e));
