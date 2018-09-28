import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from './store';

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
    this.props.loginUser(this.state);
  }

  render() {
    const { user, action } = this.props;
    if (user.username) {
      return <Redirect to="/auth/logout" />;
    }
    const login = action == 'login';
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
            <button onClick={this.handleSubmit}>Submit</button>
          </form>
        ) : (
          <p>You have logged out.</p>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
