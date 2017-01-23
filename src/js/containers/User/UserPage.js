import React, { Component } from 'react';

import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import PageMarquee from '../../components/PageMarquee';

export class UserPage extends Component {
  render() {
    console.log(this.props.userDetails);
    return (
      <Box align="center">
        <PageMarquee title="Edit User" />
        <Box pad="large">
          user details
        </Box>
      </Box>
    );
  }
};

function mapStateToProps(state, props) {
  console.log(state);
  const { userDetails } = state.login.user;

  return {
    userDetails
  };
}

export default connect(mapStateToProps)(UserPage);
