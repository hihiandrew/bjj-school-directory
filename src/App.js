import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Schools from './Schools';
import Students from './Students';
import SchoolCreate from './SchoolCreate';
import StudentCreate from './StudentCreate';
// import SchoolUpdate from './SchoolUpdate';
// import StudentUpdate from './StudentUpdate';
import { connect } from 'react-redux';
import { getSchools, getStudents } from './store';

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

    return (
      <HashRouter>
        <div>
          <Navbar />
          <hr />
          <Route exact path="/schools" component={Schools} />
          <Route exact path="/students" component={Students} />
          <Route exact path="/schools/:id" render={renderSchoolCreate} />
          <Route exact path="/students/:id" render={renderStudentCreate} />
        </div>
      </HashRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSchools: () => {
      dispatch(getSchools());
    },
    getStudents: () => {
      dispatch(getStudents());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
