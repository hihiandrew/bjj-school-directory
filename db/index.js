const db = require('./db');
const School = require('./School');
const Student = require('./Student');
const Auth = require('./Auth');

School.hasMany(Student);
Student.belongsTo(School);

Auth.belongsTo(Student);

const seed = async () => {
  const [rgfa, evolve, mga] = await Promise.all([
    School.create({
      name: 'RGFA',
      address: '100 Bayard St, Brooklyn, NY 11222',
      description:
        'Located in Brookly, we offer BJJ lessons to students from all backgrounds. Drop in for a trial class!',
    }),
    School.create({
      name: 'Evolve MMA',
      address: '26 China Street, Far East Square #01-01, Singapore 049568',
      description:
        'Evolve Mixed Martial Arts® is Asia’s top martial arts organization. It has the most number of authentic World Champions available anywhere in the world. Our award-winning instructors are not only proven competitors at the highest levels in the world, but they have also earned instructor certifications at the highest levels from the foremost authorities. Evolve MMA consistently ranks among the best academies in the world for martial arts.',
    }),
    School.create({
      name: 'Marcelo Garcia Academy',
      address: '250 W 26th St, New York, NY 10001',
      description:
        'NYC’s Premier Martial Arts School and home of 5x World & 4x ADCC Champion Marcelo Garcia.',
    }),
  ]);

  const [andrew, devi, david, tristan, bodhi] = await Promise.all([
    Student.create({ firstName: 'Andrew', lastName: 'Reis', gpa: 4.0 }),
    Student.create({ firstName: 'Devi', lastName: 'Chandra', gpa: 2.0 }),
    Student.create({ firstName: 'David', lastName: 'George', gpa: 3.1 }),
    Student.create({ firstName: 'Tristan', lastName: 'Lee', gpa: 1.0 }),
    Student.create({ firstName: 'Bodhi', lastName: 'Moses', gpa: 0.2 }),
  ]);

  const [guest, admin] = await Promise.all([
    Auth.create({
      username: 'guest',
      password: 'guestpw',
    }),
    Auth.create({
      username: 'admin',
      password: 'adminpw',
    }),
  ]);
  await Promise.all([
    andrew.setSchool(rgfa),
    devi.setSchool(rgfa),
    david.setSchool(evolve),
    tristan.setSchool(evolve),
  ]);
};

module.exports = {
  db,
  seed,
  School,
  Student,
  Auth,
};
