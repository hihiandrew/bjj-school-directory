import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
              <li>
                <Link to="/schools">Schools ({schools.length})</Link>
              </li>
              <li>
                <Link to="/students">Students ({students.length})</Link>
              </li>
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
