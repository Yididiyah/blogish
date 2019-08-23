import Link from 'next/link';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import Layout from '../components/Layout';
import { getToken } from '../lib/api/auth';
import NavBar from '../components/UI/NavBar';

class Index extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    router: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  };

  static getInitialProps(ctx) {
    const token = getToken(ctx);

    return {
      authenticated: !!token,
    };
  }

  render() {
    const { authenticated, router } = this.props;
    return (
      <React.Fragment>
        <NavBar
          authenticated={authenticated}
          pathname={router.pathname}
        />
        <Layout>
          <h1>Home</h1>
          <Link href="/about">
            <a>Go to About</a>
          </Link>
          <p> Welcome to the home page </p>
        </Layout>
      </React.Fragment>
    );
  }
}
export default withRouter(Index);
