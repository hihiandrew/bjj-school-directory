import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Schools extends Component {
  render() {
    if (!this.props.user.id) {
      return (
        <p>
          You are not authorized to view this page. Please{' '}
          <Link to="/auth/login">login</Link>.
        </p>
      );
    }
    const { schools, students } = this.props;
    const studentCount = school => {
      const studentList = students.filter(
        student => student.schoolId == school.id
      );
      return studentList.length;
    };

    return (
      <div class="container">
        <h2>School Directory</h2>
        <table class="table table-hover">
          <tr>
            <th>Gym</th>
          </tr>
          {schools.map(school => {
            return (
              <tr>
                <td key={school.id}>
                  <Link to={`schools/${school.id}`}>
                    {school.name} ({studentCount(school)})
                  </Link>
                </td>
              </tr>
            );
          })}
        </table>
        <Link to="schools/create">
          <button>New School</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schools: state.schools,
    students: state.students,
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(Schools);
