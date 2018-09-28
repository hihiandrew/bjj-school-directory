const router = require('express').Router();
const { Auth } = require('../db');

router.put('/login', async(req, res, next) => {
  const { username, password } = req.body;
  const user = await Auth.findOne({
    where: {
      username,
      password,
    },
  });
  if (user) {
    req.session.userId = user.id;
    res.json(user);
  }
  else {
    const err = new Error('Incorrect username or password.');
    err.status = 401;
    next(err);
  }
});

router.get('/me', (req, res, next) => {
  console.log('res.SESSION:');
  console.log(req.session);
  if (!req.session.userId) {
    const err = new Error('No user logged in.');
    err.status = 404;
    next(err);
  }
  else {
    Auth.findById(req.session.userId)
      .then(user => res.json(user))
      .catch(next);
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.status(204).end();
});

router.post('/signup', async(req, res, next) => {
  const { username, password } = req.body;
  const user = await Auth.create({
    username,
    password,
  });
  req.session.userId = user.id;
  res.json(user);
});

router.put('/update', (req, res, next) => {});

router.delete('/remove', (req, res, next) => {});

module.exports = router;
