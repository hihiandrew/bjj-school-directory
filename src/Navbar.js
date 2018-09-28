import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from './store';

class Navbar extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logoutUser();
    this.props.history.push('/auth/logout');
  }

  render() {

    const { schools, students, user } = this.props;
    console.log('USER: ')
    console.log(user)
    return (
      <div>
        {!user.username ? (
          <div>
            <p>
              Not logged in <br />
              <Link to="/auth/login">Login</Link>
              {' or '}
              <Link to="/auth/signup">Sign Up</Link>
            </p>
          </div>
        ) : (
          <div>
            <div>
               <p>
              Logged in as {user.username} <br />
              </p>
            <p onClick={this.handleLogout}>Logout</p>
            </div>

            <ul>
              <Link to="/schools">
                <li>Schools ({schools.length})</li>
              </Link>
              <Link to="/students">
                <li>Students ({students.length})</li>
              </Link>
            </ul>
          </div>
        )}
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
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
