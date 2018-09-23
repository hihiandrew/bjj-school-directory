import React, { Component } from 'react';
import { connect } from 'react-redux';

class StudentCreateUpdate extends Component {
  render() {
    return <hr />;
  }
}

const mapStateToProps = (state, { id, history }) => {
  console.log(id, history);
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentCreateUpdate);
