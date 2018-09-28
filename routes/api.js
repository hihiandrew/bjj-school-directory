const express = require('express');
const router = express.Router();
const { School, Student } = require('../db');

router.get('/schools', (req, res, next) => {
  School.findAll().then(schools => {
    res.json(schools);
  });
});

router.get('/students', (req, res, next) => {
  Student.findAll().then(students => {
    res.json(students);
  });
});

module.exports = router;
