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
    const { schools, students, user, history } = this.props;
    return (
      <div>
        <nav class="navbar navbar-inverse navbar-static-top">
          <div class="container">
            {/* <!-- Navbar Header [contains both toggle button and navbar brand] --> */}
            <div class="navbar-header">
              {/* <!-- Toggle Button [handles opening navbar components on mobile screens]--> */}
              <button
                type="button"
                class="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#exampleNavComponents"
                aria-expanded="false"
              >
                <i class="glyphicon glyphicon-align-center" />
              </button>

              {/* <!-- Navbar Brand --> */}
              <a href="/" class="navbar-brand">
                BJJ
              </a>
            </div>

            <div class="collapse navbar-collapse" id="exampleNavComponents">
              {/* <!-- Navbar Menu --> */}
              <ul class="nav navbar-nav navbar-right">
                <li class="active">
                  <a href="/">Home</a>
                </li>
                <li>
                  <Link to="/students">Students ({students.length})</Link>
                </li>
                <li>
                  <Link to="/schools">Schools ({schools.length})</Link>
                </li>
              </ul>

              {/* <!-- Navbar Button --> */}
              <button
                type="button"
                class="btn btn-default navbar-btn navbar-left"
                onClick={
                  user.username
                    ? this.handleLogout
                    : () => {
                        history.push('/auth/login');
                      }
                }
              >
                {user.username ? 'Logout' : 'Login'}
              </button>

              {/* <!-- Navbar Text --> */}
              <p class="navbar-text">
                {user.username
                  ? `Logged in as ${user.username}`
                  : `Not logged in.`}
              </p>
            </div>
          </div>
        </nav>

        {/* {!user.username ? (
          <div>
            <p>
              Not logged in <br />
              <Link to="/auth/login">Login</Link>
              {' or '}
              <Link to="/auth/signup">Sign Up</Link>
            </p>
          </div>
        ) : (
          <div class="navbar navbar-default">
            <div>
              <ul>
                <li>
                  <Link to="/schools">Schools ({schools.length})</Link>
                </li>
                <li>
                  <Link to="/students">Students ({students.length})</Link>
                </li>
              </ul>
            </div>
            <div>
              <p>
                Logged in as {user.username} <br />
              </p>
              <p onClick={this.handleLogout}>Logout</p>
            </div>
          </div>
        )} */}
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
