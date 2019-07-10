import React from 'react';

import Input from './Input/Input';


const login = () => (
  <React.Fragment>
    <Input type="text" name="email" placeholder="Your Name" label="Email" />
    <Input type="text" name="password" placeholder="Your Password" label="Password" />
  </React.Fragment>
);

export default login;
