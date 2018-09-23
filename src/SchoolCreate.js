import React, { Component } from 'react';
import { createSchool } from './store';
import { connect } from 'react-redux';

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
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createSchool(this.state);
    this.setState({
      name: '',
      address: '',
      description: '',
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
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
            onChange={this.handleChange}
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
            Create School
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
    createSchool: school => dispatch(createSchool(school)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolCreate);
