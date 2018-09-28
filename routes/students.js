const express = require('express');
const router = express.Router();
const { Student } = require('../db');

router.post('/create', (req, res, next) => {
  const { firstName, lastName, gpa, schoolId } = req.body;
  const student = Student.build({ firstName, lastName, gpa });
  if (schoolId) {
    student.schoolId = schoolId;
  }
  student
    .save()
    .then(student => res.json(student))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  const { schoolId } = req.body;
  const newSchoolId = schoolId ? schoolId : null;
  Student.findById(req.params.id)
    .then(student => {
      student.setSchool(newSchoolId);
      return student.update(req.body);
    })
    .then(student => {
      res.json(student);
    })
    .catch(next);
});

module.exports = router;
