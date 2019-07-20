import React, { Component } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import Cookie from 'js-cookie';

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
  formErrorMessage: '',
  isValid: true,
};
class Signup extends Component {
    state={
      username: '',
      email: '',
      password: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      formErrorMessage: '',
      isValid: true, // to prevent multiple requests during submission
    }

      handleChange = (event) => {
        // const { email, password, username } = this.state;
        this.setState({ [event.target.name]: event.target.value });
        // console.log(`Email: ${email} Password: ${password} Username: ${username}`);
      }

      handleSignup = (event) => {
        event.preventDefault();
        const {
          email, password, username,
        } = this.state;
        const formValid = this.validate();
        if (formValid) {
          let response;
          // to prevent clicking button when form submission is in progress
          // disable login button after it is clicked
          this.setState({ isValid: false });
          // returns a promise so should be handled accordingly
          signupUser(username, email, password)
            .then((result) => {
              response = result;
              // enable login button after we get reply from API
              this.setState({ isValid: true });
              // console.log('Response on Signup Page:', response);
              Cookie.set('auth-token', response.headers.authorization);
              // console.log('Response headers set on cookie: ', Cookie.get('auth-token'));
              if (response.status) {
                // Send the user to the profile page using the returned token from the
                // signupUser function
                Router.push('/profile');
                // clear form if there's no error on the form
                this.setState(initialState);
              }
              if (response.response) {
                // console.log('Error Response Message on Signup page: ', response.response);
                /* If there is a response because there might not be a response.response
                  (it may be undefiled) if I was blocked by a CORS issue or some other problem.
                  */
                this.setState({ formErrorMessage: response.response.data.message });
              }
            });

          return true;
        }
        return true;
      }

       validateUserName = () => {
         let nameError = '';
         const { username } = this.state;
         const regExp = /^[a-zA-Z0-9]{2,52}$/;
         if (!username) {
           // check if username is empty
           nameError = 'Username is required';
           this.setState({ nameError });
           return false;
         } if (!regExp.test(username)) {
           // check if username is valid
           nameError = 'Username Invalid';
           this.setState({ nameError });
           return false;
         }

         // if there is no error
         nameError = '';
         this.setState({ nameError });
         return true;
       }

      validateEmail = () => {
        let emailError = '';
        const { email } = this.state;
        const regExp = /^[a-zA-Z0-9._]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,4}$/;
        if (!email) {
          // check if email is empty
          emailError = 'Email is required';
          this.setState({ emailError });
          return false;
        } if (!regExp.test(email)) {
          // check if email conforms to the regExp specified
          emailError = 'Invalid Email';
          this.setState({ emailError });
          return false;
        }
        // if there is no error
        emailError = '';
        this.setState({ emailError });
        return true;
      }

      validatePassword = () => {
        let passwordError = '';
        const { password } = this.state;
        const regExp = /^[a-zA-Z0-9]{8,52}$/;

        if (!password) {
          // then if password is empty
          passwordError = 'Password is required';
          this.setState({ passwordError });
          return false;
        } if (password.length < 8) {
          // if password is less than 8
          passwordError = 'Password should be at least eight characters';
          this.setState({ passwordError });
          return false;
        } if (!regExp.test(password)) {
          // if password is greater than 52
          passwordError = 'Password is invalid';
          this.setState({ passwordError });
          return false;
        }

        passwordError = '';
        this.setState({ passwordError });
        return true;
      }

      validate = () => {
        if (this.validateEmail() && this.validatePassword() && this.validateUserName()) {
          return true;
        }
        return false;
      }

      render() {
        const {
          email, password, username, nameError, passwordError,
          emailError, formErrorMessage, isValid,
        } = this.state;

        return (

          <S.Signup>
            <h1>Sign up</h1>
            <form onSubmit={this.handleSignup} noValidate autoComplete="off">
              <Input
                onBlur={this.validateUserName}
                error={nameError}
                onChange={this.handleChange}
                value={username}
                type="text"
                name="username"
                placeholder="Username"
              />
              <Input
                onBlur={this.validateEmail}
                error={emailError}
                onChange={this.handleChange}
                value={email}
                type="email"
                name="email"
                placeholder="Email Address"
              />
              <Input
                onBlur={this.validatePassword}
                error={passwordError}
                onChange={this.handleChange}
                value={password}
                type="password"
                name="password"
                placeholder="Create a password"
              />
              <div>{formErrorMessage}</div>
              <button disabled={!isValid} type="submit">Sign up</button>
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

& button:disabled {
  background-color: #cccccc;
}


& div {
  font-size: 16px;
  color: red;
}
  @media ${device.mobileM}{
    max-width: 300px;
  }

  @media ${device.laptop} { 
    max-width: 500px;
  }
  `;

/* TODO:
  Search for how and where to save the token sent from server
  Check which page to go to after Signup
*/
