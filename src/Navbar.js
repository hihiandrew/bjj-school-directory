import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
  render() {
    const { schools, students } = this.props;
    return (
      <ul>
        <Link to="/schools">
          <li>Schools ({schools.length})</li>
        </Link>
        <Link to="/students">
          <li>Students ({students.length})</li>
        </Link>
      </ul>
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
)(Navbar);
