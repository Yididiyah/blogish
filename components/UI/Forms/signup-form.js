import React, { Component } from 'react';
import styled from 'styled-components';
import Input from './Input/Input';
import { device } from '../../../lib/device';
import { signupUser } from '../../../lib/auth';

const initialState = {
  username: '',
  email: '',
  password: '',
  nameError: '',
  emailError: '',
  passwordError: '',
};
class Signup extends Component {
    state={
      username: '',
      email: '',
      password: '',
      nameError: '',
      emailError: '',
      passwordError: '',

    }

      handleChange = (event) => {
        // const { email, password, username } = this.state;
        this.setState({ [event.target.name]: event.target.value });
        // console.log(`Email: ${email} Password: ${password} Username: ${username}`);
      }

      handleLogin = (event) => {
        event.preventDefault();
        const { email, password, username } = this.state;
        const isValid = this.validate();
        if (isValid) {
          signupUser(username, email, password);
          // clear form
          this.setState(initialState);
        }
      }

      validate = () => {
        const {
          email,
        } = this.state;
        if (!email.includes('@')) {
          this.setState({ emailError: 'Invalid Email' });
          return false;
        }
        return true;
      };

      render() {
        const {
          email, password, username, nameError, passwordError, emailError,
        } = this.state;
        return (

          <S.Signup>
            <h1>Sign up</h1>
            <form onSubmit={this.handleLogin} noValidate>
              <Input
                error={nameError}
                onChange={this.handleChange}
                value={username}
                type="text"
                name="username"
                placeholder="Username"
              />
              <Input
                error={emailError}
                onChange={this.handleChange}
                value={email}
                type="email"
                name="email"
                placeholder="Email Address"
              />
              <Input
                error={passwordError}
                onChange={this.handleChange}
                value={password}
                type="password"
                name="password"
                placeholder="Create a password"
              />
              <button type="submit">Sign up</button>
            </form>
          </S.Signup>
        );
      }
}

export default Signup;

const S = {};
S.Signup = styled.div`
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
