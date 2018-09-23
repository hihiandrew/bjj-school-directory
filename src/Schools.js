import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Schools extends Component {
  render() {
    const { schools, students } = this.props;
    const studentCount = school => {
      const studentList = students.filter(
        student => student.schoolId == school.id
      );
      return studentList.length;
    };
    return (
      <div>
        <ul>
          {schools.map(school => {
            return (
              <li key={school.id}>
                <Link to={`schools/${school.id}`}>
                  {school.name} ({studentCount(school)})
                </Link>
              </li>
            );
          })}
        </ul>
        <Link to="schools/create">
          <div>New School</div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schools: state.schools,
    students: state.students,
  };
};

export default connect(
  mapStateToProps,
  null
)(Schools);
