import React, { Component } from 'react';
import { addSchool, updateSchool, deleteSchool } from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import StudentList from './StudentList'
import AddStudents from './AddStudents'

class SchoolCreate extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setFormValues = this.setFormValues.bind(this);
    this.handleDeleteSchool = this.handleDeleteSchool.bind(this);
  }

  componentDidMount() {
    this.setFormValues();
  }

  setFormValues() {
    if (this.props.id == 'create') {
      return this.setState({
        name: '',
        address: '',
        description: ''
      });
    }
    const _school = this.props.schools.find(
      school => school.id * 1 == this.props.id * 1);
    const { name, address, description } = _school
    return this.setState({
      name,
      address,
      description,
    });
  }

  handleDeleteSchool() {
    const { id, history } = this.props
    this.props.deleteSchool(id)
      .then(() => history.push('/schools'))
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { id, history, addSchool, updateSchool } = this.props
    if (id == 'create') {
      return addSchool(this.state)
        .then(() => history.push('/schools'));
    }
    else {
      updateSchool(this.state, id * 1)
        .then(() => history.push(`/schools/${id}`));
    }
  }

  render() {
    const { id, history } = this.props;
    const createForm = id == 'create';
    return (
      <div>
        <h3>{createForm ? 'Create' : 'Update'} School</h3>
        <form onSubmit={this.handleSubmit}>
          <p>Name: </p>{' '}
          <input
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
          />
          <p>Address: </p>{' '}
          <input
            value={this.state.address}
            name="address"
            onChange={this.handleChange
            }
            />
          <p>Description: </p>{' '}
          <input
            value={this.state.description}
            name="description"
            onChange={this.handleChange}
          />
          <br />
          <br />
          <button type="submit" disabled={!this.state.name}>
            {createForm ? 'Create' : 'Update'} School
          </button>
          {!createForm ?
          <div>
          <button onClick={this.handleDeleteSchool}>
            Delete School
          </button>
          <StudentList id={id}/>
          <AddStudents id={id} history={history}/>
          <br/>
          <Link
            to = {
                {
                  pathname: '/students/create',
                  state: {schoolId: id}
                }
              } >
              <button>Add New Student</button>
          </Link>

          </div>
          : ''}
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
    addSchool: school => dispatch(addSchool(school)),
    updateSchool: (school, id) => dispatch(updateSchool(school, id)),
    deleteSchool: id => dispatch(deleteSchool(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolCreate);
