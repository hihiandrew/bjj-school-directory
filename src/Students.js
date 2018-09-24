import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Students extends Component {
  render() {
    const { students, schools } = this.props;
    const findSchool = student => {
      const foundSchool = schools.find(school => school.id == student.schoolId);
      return foundSchool ? foundSchool.name : 'Unaffiliated';
    };
    return (
      <div>
        <ul>
          {students.map(student => {
            return (
              <li key={student.id}>
                <Link to={`/students/${student.id}`}>
                  {student.firstName} {student.lastName}
                </Link>{' '}
                -{' '}
                {student.schoolId ? (
                  <Link to={`/schools/${student.schoolId}`}>
                    {findSchool(student)}
                  </Link>
                ) : (
                  'Unaffiliated'
                )}
              </li>
            );
          })}
        </ul>
        <Link to="students/create">
          <button>New Student</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.students,
    schools: state.schools,
  };
};

export default connect(
  mapStateToProps,
  null
)(Students);
