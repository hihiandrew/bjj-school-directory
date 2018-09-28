import React, { Component } from 'react';
import { addStudent, deleteStudent, updateStudent } from './store';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class StudentCreate extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      schoolId: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setFormValues = this.setFormValues.bind(this);
  }

  componentDidMount() {
    this.setFormValues();
  }

  setFormValues() {
    const { id, students, history } = this.props;
    if (id == 'create') {
      const schoolId = history.location.state
        ? history.location.state.schoolId * 1
        : '';
      return this.setState({
        firstName: '',
        lastName: '',
        gpa: '',
        schoolId,
      });
    }
    const _student = students.find(student => student.id * 1 == id * 1);
    const { firstName, lastName, gpa, schoolId } = _student;
    return this.setState({
      firstName,
      lastName,
      gpa,
      //handles schoolId:null students
      schoolId: schoolId || '',
    });
  }

  handleChange(e) {
    if (e.target.type == 'number' || e.target.type == 'select-one') {
      return this.setState({
        [e.target.name]: e.target.value * 1,
      });
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.id == 'create') {
      this.props
        .addStudent(this.state)
        .then(() => this.props.history.push('/students'));
    } else {
      this.props
        .updateStudent(this.state, this.props.id * 1)
        .then(() => this.props.history.push('/students'));
    }
  }

  render() {
    if (!this.props.user.id) {
      return (
        <p>
          You are not authorized to view this page. Please{' '}
          <Link to="/auth/login">login</Link>.
        </p>
      );
    }

    const { id, schools, deleteStudent } = this.props;
    const createForm = this.props.id == 'create';
    return (
      <div>
        <h3>{createForm ? 'Create' : 'Update'} Student</h3>
        <form onSubmit={this.handleSubmit}>
          <p>First Name: </p>
          <input
            value={this.state.firstName}
            name="firstName"
            onChange={this.handleChange}
          />
          <p>Last Name: </p>
          <input
            value={this.state.lastName}
            name="lastName"
            onChange={this.handleChange}
          />
          <p>GPA: </p>
          <input
            value={this.state.gpa}
            name="gpa"
            type="number"
            onChange={this.handleChange}
          />
          <p>School: </p>
          <select
            name="schoolId"
            onChange={this.handleChange}
            value={this.state.schoolId}
          >
            <option value="">Unaffiliated</option>
            {schools.map(school => {
              return (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              );
            })}
          </select>
          <br />
          <br />
          <button
            type="submit"
            disabled={!this.state.firstName || !this.state.lastName}
          >
            {createForm ? 'Create' : 'Update'} Student
          </button>
          {!createForm ? (
            <button
              onClick={e => {
                e.preventDefault();
                deleteStudent(id);
              }}
            >
              {' '}
              Delete Student{' '}
            </button>
          ) : (
            ''
          )}
        </form>
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

const mapDispatchToProps = dispatch => {
  return {
    addStudent: student => dispatch(addStudent(student)),
    deleteStudent: id => dispatch(deleteStudent(id)),
    updateStudent: (student, id) => dispatch(updateStudent(student, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentCreate);
