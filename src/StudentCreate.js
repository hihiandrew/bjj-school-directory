import React, { Component } from 'react';
import { addStudent, deleteStudent, updateStudent } from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MyEditor from './MyEditor'



class StudentCreate extends Component {
  constructor(props) {
    super(props);

    this._student = this.props.students.find(
      student => student.id * 1 == this.props.id * 1
    );

    this.state =
      this.props.id == 'create' ? {
        firstName: '',
        lastName: '',
        gpa: '',
        schoolId: this.props.history.location.state ?
          this.props.history.location.state.schoolId * 1 : '',
        view: false,
      } : {
        firstName: this._student.firstName,
        lastName: this._student.lastName,
        gpa: this._student.gpa || '',
        schoolId: this._student.schoolId || '',
        view: true,
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  toggleView(e) {
    e.preventDefault();
    this.setState({ view: !this.state.view });
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
    const { id, history, addStudent } = this.props;
    e.preventDefault();
    if (id == 'create') {
      addStudent(this.state).then(user => {
        console.log(user);
        history.push(`/students/${user.id}`);
      });
    }
    else {
      updateStudent(this.state, id * 1).then(() =>
        this.setState({ view: true })
      );
    }
  }

  render() {
    console.log(this.state);
    if (!this.props.user.id) {
      return (
        <p>
          You are not authorized to view this page. Please{' '}
          <Link to="/auth/login">login</Link>.
        </p>
      );
    }

    const { id, schools, students, deleteStudent, history } = this.props;
    const { view, firstName, lastName, gpa, schoolId } = this.state;
    const createForm = this.props.id == 'create';

    const student = students.find(s => s.id == id);
    const school = student ? schools.find(s => s.id == student.schoolId) : {};

    return (
      <div class="container">
        <div class="row">
          <h3>
            {createForm ? 'Create ' : ''}
            Student
            {view ? ' Details ' : ' Update '}
            <button
              onClick={this.toggleView}
              class="btn-primary btn-sm"
              >
              {view ? 'Edit' : 'View'}
            </button>
          </h3>

        </div>

        <div class="row">
          <div class="col-sm-3">
            <MyEditor />
          </div>
          <div class="col-sm-9">
            <form onSubmit={this.handleSubmit}>
            <p>First Name: </p>
            {view ? (
              <p>{firstName}</p>
            ) : (
              <input
                value={this.state.firstName}
                name="firstName"
                onChange={this.handleChange}
              />
            )}

            <p>Last Name: </p>
            {view ? (
              <p>{lastName}</p>
            ) : (
              <input
                value={this.state.lastName}
                name="lastName"
                onChange={this.handleChange}
              />
            )}

            <p>GPA: </p>
            {view ? (
              <p>{gpa}</p>
            ) : (
              <input
                value={this.state.gpa}
                name="gpa"
                type="number"
                onChange={this.handleChange}
              />
            )}

            <p>School: </p>
            {view ? (
              <p>{school ? school.name : 'Unaffiliated'}</p>
            ) : (
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
            )}

            <br />
            <br />

            {view ? (
              ''
            ) : (
              <button
                type="submit"
                disabled={!this.state.firstName || !this.state.lastName}
                class="btn-primary btn-sm"
              >
                {createForm ? 'Create' : 'Update'} Student
              </button>
            )}

            {!createForm ? (
              <button
                onClick={e => {
                  e.preventDefault();
                  deleteStudent(id);
                  history.push('/students');
                }}
                class="btn-warning btn-sm"
              >
                Delete Student
              </button>
            ) : (
              ''
            )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schools: state.schools,
    students: state.students,
    user: state.user,
    loaded: state.loaded,
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
