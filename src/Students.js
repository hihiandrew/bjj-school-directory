import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Students extends Component {
  render() {
    if (!this.props.user.id) {
      return (
        <p>
          You are not authorized to view this page. Please{' '}
          <Link to="/auth/login">login</Link>.
        </p>
      );
    }
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
    user: state.user,
  };
};


export default connect(
  mapStateToProps,
  null
)(Students);
