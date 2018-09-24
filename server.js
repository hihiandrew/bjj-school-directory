const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { db, seed, School, Student } = require('./db');

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, 'public')));
server.use('/dist', express.static(path.join(__dirname, 'dist')));

server.get('/api/schools', (req, res, next) => {
  School.findAll().then(schools => {
    res.json(schools);
  });
});

server.get('/api/students', (req, res, next) => {
  Student.findAll().then(students => {
    res.json(students);
  });
});

server.post('/schools/create', (req, res, next) => {
  School.create(req.body)
    .then(school => res.json(school))
    .catch(next);
});

server.post('/students/create', (req, res, next) => {
  const { firstName, lastName, gpa, schoolId } = req.body
  const student = Student.build({ firstName, lastName, gpa });
  if (schoolId) { student.schoolId = schoolId }
  student
    .save()
    .then(student => res.json(student))
    .catch(next);
});

server.delete('/schools/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.destroy())
    .then(() => res.sendStatus(200))
    .catch(next)
})

server.delete('/students/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(200))
    .catch(next)
})

server.put('/schools/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.update(req.body))
    .then(school => res.json(school))
    .catch(next);
});

server.put('/students/:id', (req, res, next) => {
  const { school } = req.body;
  const newSchoolId = school ? school : null;
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
