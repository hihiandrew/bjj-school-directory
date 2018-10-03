import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser, signupUser } from './store';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { action } = this.props;
    if (action == 'login') {
      this.props.loginUser(this.state);
    } else {
      this.props.signupUser(this.state);
    }
    this.props.history.push('/');
  }

  render() {
    const { action } = this.props;
    const login = action == 'login' || action == 'signup';
    return (
      <div>
        {login ? (
          <form onSubmit={this.onSubmit}>
            <div>
              <label>Username: </label>
              <input
                type="text"
                name="username"
                onChange={this.handleChange}
                value={this.state.username}
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>
            <button onClick={this.handleSubmit}>
              {action == 'login' ? 'Login' : 'Signup'}
            </button>
            {action == 'login' ? (
              <p>
                or signup <Link to="/auth/signup">here</Link>.
              </p>
            ) : (
              ''
            )}
          </form>
        ) : (
          <p>
            You are not logged in. Log in <Link to="/auth/login">here</Link>.
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user)),
    signupUser: user => dispatch(signupUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
