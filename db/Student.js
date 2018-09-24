const Sequelize = require('sequelize');
const db = require('./db');

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gpa: {
    type: Sequelize.FLOAT,
  },
}, {
  hooks: {
    beforeSave: student => {
      if (student.gpa == '') { student.gpa = null }
    }
  }
});

module.exports = Student;
