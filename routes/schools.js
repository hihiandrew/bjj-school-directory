const express = require('express');
const router = express.Router();
const { School } = require('../db');

router.post('/create', (req, res, next) => {
  School.create(req.body)
    .then(school => res.json(school))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.destroy())
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.update(req.body))
    .then(school => res.json(school))
    .catch(next);
});

module.exports = router;
