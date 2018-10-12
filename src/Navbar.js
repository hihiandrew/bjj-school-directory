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
    const { schools, students, user, history, id } = this.props;
    return (
      <div>
        <nav class="navbar navbar-inverse">
          <div class="container">

            {/* <!-- Navbar Header [toggle + brand] --> */}
            <div class="navbar-header">
              {/* <!-- Toggle Button [handles mobile screens]--> */}
              <button
                type="button"
                class="navbar-toggle"
                data-toggle="collapse"
                data-target="#myNavbar"
                aria-expanded="false"
              >
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              {/* <!-- Navbar Brand --> */}
              <Link to="/">
                <a class="navbar-brand">BJJ</a>
              </Link>
            </div>

            <div class="collapse navbar-collapse" id="myNavbar">

              {/* <!-- Navbar Menu --> */}
              <ul class="nav navbar-nav">
                <li class={id == 'home' ? 'active' : ''}>
                  <Link to="/">Home</Link>
                </li>
                <li class={id == 'students' ? 'active' : ''}>
                  <Link to="/students">Students ({students.length})</Link>
                </li>
                <li class={id == 'schools' ? 'active' : ''}>
                  <Link to="/schools">Schools ({schools.length})</Link>
                </li>
              </ul>


              {/* <!-- Navbar Logout --> */}
              <ul class="nav navbar-nav navbar-right">
                <li>
                  <p class="navbar-text">
                    {user.username
                  ? `Logged in as ${user.username}`
                  : `Not logged in.`}
                  </p>
                </li>
                <li>
                  <a
                  class="btn btn-secondary btn-md navbar-right"
                  onClick={
                    user.username
                      ? this.handleLogout
                      : () => {
                          history.push('/auth/login');
                        }
                    }
                  >
                  <span class={user.username ?
                  "glyphicon glyphicon-log-out":
                  "glyphicon glyphicon-log-in"}/>
                    {user.username ? ' Logout' : ' Login'}
                  </a>
                </li>
              </ul>

            </div>
          </div>
        </nav>
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
