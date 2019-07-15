import React, { Component } from 'react';
import styled from 'styled-components';
import Input from './Input/Input';
import { device } from '../../../lib/device';
import { signupUser } from '../../../lib/api/auth';

const initialState = {
  // to be used for clearing the form for another input
  username: '',
  email: '',
  password: '',
  nameError: '',
  emailError: '',
  passwordError: '',
  responseStatus: '',
  errorOnForm: false,
};
class Signup extends Component {
    state={
      username: '',
      email: '',
      password: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      responseStatus: '',
      errorOnForm: false,

    }

      handleChange = (event) => {
        // const { email, password, username } = this.state;
        this.setState({ [event.target.name]: event.target.value });
        // console.log(`Email: ${email} Password: ${password} Username: ${username}`);
      }

      handleSignup = (event) => {
        event.preventDefault();
        const {
          email, password, username, errorOnForm,
        } = this.state;
        let responseStatusNo;
        const isValid = this.validate();
        if (isValid) {
          signupUser(username, email, password).then((response) => {
            this.getStatusCode(response);
            responseStatusNo = response.status.toString();
          }).then(() => {
            if (!responseStatusNo.startsWith('2')) {
              this.setState({ errorOnForm: true });
              this.showErrorMessages(responseStatusNo);
            }
          });

          // clear form if there's no error on the form
          if (!errorOnForm) {
            this.setState(initialState);
          }
        }
      }

      getStatusCode = (response) => {
        console.log(`Response on Signup Form: ${response.status}`);
        this.setState({ responseStatus: response.status });
      }

      // showErrorMessages = (responseStatusNo) => {


      // }

      validate = () => {
        let nameError = '';
        let emailError = '';
        let passwordError = '';

        const { email, password, username } = this.state;
        // First check if email includes @ and dot
        if (!email.includes('@')) {
          emailError = 'Invalid Email';
        }
        if (!email.includes('.')) {
          emailError = 'Invalid Email';
        }
        // check if password length >= 8
        if (password.length < 8) {
          passwordError = 'Password should be at least eight characters';
        }
        // then check if email is empty
        if (!email) {
          emailError = 'Email is required';
        }
        // then if password is empty
        if (!password) {
          passwordError = 'Password is required';
        }
        // check if username is empty
        if (!username) {
          nameError = 'Username is required';
        }


        if (emailError || nameError || passwordError) {
          this.setState({ emailError, nameError, passwordError });
          return false;
        }
        return true;
      };

      render() {
        const {
          email, password, username, nameError, passwordError, emailError, responseStatus,
        } = this.state;

        return (

          <S.Signup>
            <h1>Sign up</h1>
            <form onSubmit={this.handleSignup} noValidate autoComplete="off">
              <Input

                error={nameError}
                onChange={this.handleChange}
                value={username}
                type="text"
                name="username"
                placeholder="Username"
              />
              <Input
                onBlur={this.validate}
                error={emailError}
                onChange={this.handleChange}
                value={email}
                type="email"
                name="email"
                placeholder="Email Address"
              />
              <Input
                onBlur={this.validate}
                error={passwordError}
                onChange={this.handleChange}
                value={password}
                type="password"
                name="password"
                placeholder="Create a password"
              />
              {responseStatus}
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
