import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Schools from './Schools';
import Students from './Students';
import SchoolCreate from './SchoolCreate';
import StudentCreate from './StudentCreate';
import { connect } from 'react-redux';
import { getSchools, getStudents, checkUser } from './store';

class App extends Component {
  componentDidMount() {
    this.props.getStudents();
    this.props.getSchools();
  }

  render() {
    const renderSchoolCreate = ({ match, history }) => {
      return <SchoolCreate id={match.params.id} history={history} />;
    };

    const renderStudentCreate = ({ match, history }) => {
      return <StudentCreate id={match.params.id} history={history} />;
    };

    const renderAuth = ({ match, history }) => {
      return <Login action={match.params.action} history={history} />;
    };

    return (
      <HashRouter>
        <div>
          <Navbar />
          <hr />
          <Route exact path="/auth/:action" component={renderAuth} />
          <Route exact path="/schools" component={Schools} />
          <Route exact path="/students" render={Students} />
          <Route exact path="/schools/:id" render={renderSchoolCreate} />
          <Route exact path="/students/:id" render={renderStudentCreate} />
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

const mapDispatchToProps = dispatch => {
  return {
    getSchools: () => {
      dispatch(getSchools());
    },
    getStudents: () => {
      dispatch(getStudents());
    },
    checkUser: () => dispatch(checkUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
