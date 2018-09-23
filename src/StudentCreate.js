import React, { Component } from 'react';
import { createStudent, updateStudent } from './store';
import { connect } from 'react-redux';

class StudentCreate extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      school: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setFormValues = this.setFormValues.bind(this);
  }

  componentDidMount() {
    this.setFormValues();
  }

  setFormValues() {
    if (this.props.id == 'create') {
      return this.setState({
        firstName: '',
        lastName: '',
        gpa: '',
        school: '',
      });
    }

    const _student = this.props.students.find(
      student => student.id * 1 == this.props.id * 1
    );

    return this.setState({
      firstName: _student.firstName,
      lastName: _student.lastName,
      gpa: _student.gpa || '',
      school: _student.schoolId || '',
    });
  }

  handleChange(e) {
    console.log(e.target.type);
    if (e.target.type == 'number' || e.target.type == 'select-one') {
      return this.setState({ [e.target.name]: e.target.value * 1 });
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.id == 'create') {
      this.props
        .createStudent(this.state)
        .then(() => this.props.history.push('/students'));
    } else {
      console.log(this.state);
      this.props
        .updateStudent(this.state, this.props.id)
        .then(() => this.props.history.push('/students'));
    }
    this.setState({
      firstName: '',
      lastName: '',
      gpa: '',
      school: '',
    });
  }

  render() {
    const { schools } = this.props;
    const createForm = this.props.id == 'create' ? true : false;
    return (
      <div>
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
            name="school"
            onChange={this.handleChange}
            type="number"
            value={this.state.school}
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
        </form>
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

const mapDispatchToProps = dispatch => {
  return {
    createStudent: student => dispatch(createStudent(student)),
    updateStudent: (student, id) => dispatch(updateStudent(student, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentCreate);
