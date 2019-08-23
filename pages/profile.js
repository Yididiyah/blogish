import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import {
  getUserProfile, signOut, redirectIfNotAuthenticated, getToken,
} from '../lib/api/auth';
import NavBar from '../components/UI/NavBar';

class Profile extends React.Component {
  state = {
    user: '',
  }

  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    router: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  };

  static async getInitialProps(ctx) {
    console.log('Process.Browser : ', process.browser);
    // console.log('Context Object', ctx);
    if (redirectIfNotAuthenticated(ctx)) {
      return {};
    }
    const token = getToken(ctx);

    return {
      authenticated: !!token,
    };
  }

  componentDidMount() {
    getUserProfile().then(user => this.setState({ user }));
  }

  logoutUser = () => {
    signOut();
  }

  render() {
    const { user } = this.state;
    const { authenticated, router } = this.props;
    return (
      <React.Fragment>
        <NavBar
          authenticated={authenticated}
          pathname={router.pathname}
        />
        <S.card>
          <img src="../static/avatar.png" alt="Avatar" />
          <S.container>
            <h4>
Username:
              {user.username}
            </h4>
            <h4>
Email:
              {user.email}
            </h4>
            <button onClick={this.logoutUser} type="button">Logout</button>
          </S.container>
          {/* {JSON.stringify(user, null, 2)} */}
        </S.card>
      </React.Fragment>
    );
  }
}

export default withRouter(Profile);

const S = {};

S.card = styled.div`
  box-shadow: 0.4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
  & img {
    width: 100%;
  }
  :hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

S.container = styled.div` 
  padding: 2px 16px;

  & button {
    width: 100%;
  margin-top: 15px;
  padding: 10px;
  background-color: red;
  border-radius: 7px;
  color: white;
  }
`;
