import React, { Component } from 'react';
import styled from 'styled-components';
import Input from './Input/Input';
import { device } from '../../../lib/device';
import { loginUser } from '../../../lib/api/auth';

const initialState = {
  // to be used for clearing the form for another input
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
};
class Login extends Component {
  state={
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  }

  validate = () => {
    let emailError = '';
    let passwordError = '';

    const { email, password } = this.state;

    // First check if email includes @
    if (!email.includes('@')) {
      emailError = 'Invalid Email';
    }
    if (!email.includes('.')) {
      emailError = 'Invalid Email';
    }

    // then check if email is empty
    if (!email) {
      emailError = 'Email is required';
    }


    // then if password is empty
    if (!password) {
      passwordError = 'Password is required';
    }


    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    }
    return true;
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    const isValid = this.validate();
    if (isValid) {
      loginUser(email, password);
      // clear form
      this.setState(initialState);
    }
  }

  render() {
    const {
      email, password, passwordError, emailError,
    } = this.state;
    return (
      <S.Login>
        <h1>Login</h1>
        <form onSubmit={this.handleLogin} noValidate autoComplete="off">
          <Input
            onBlur={this.validate}
            error={emailError}
            value={email}
            onChange={this.handleChange}
            type="email"
            name="email"
            placeholder="Email Address"
          />
          <Input
            onBlur={this.validate}
            error={passwordError}
            value={password}
            onChange={this.handleChange}
            type="password"
            name="password"
            placeholder="Password"
          />
          <button type="submit">Log in</button>
        </form>
      </S.Login>
    );
  }
}
export default Login;

const S = {};
S.Login = styled.div`
  margin: auto;
  font-family: "sans-serif";
  text-align: center;
  border-style: groove;
  padding: 15px;

& button {
  width: 100%;
  margin-top: 15px;
  padding: 10px;
  background-color: red;
  border-radius: 7px;
  color: white;
  
}
  @media ${device.mobileM}{
    max-width: 300px;
  }

  @media ${device.laptop} { 
    max-width: 500px;
  }

  
`;
