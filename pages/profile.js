import React from 'react';

import { getUserProfile } from '../lib/api/auth';

class Profile extends React.Component {
    state = {
      user: null,
    }

    componentDidMount() {
      getUserProfile().then(user => this.setState({ user }));
    }

    render() {
      const { user } = this.state;
      return (

        <div>
          {JSON.stringify(user, null, 2)}
        </div>
      );
    }
}

export default Profile;
