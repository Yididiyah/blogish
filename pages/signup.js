import React, { Component } from 'react';
import styled from 'styled-components';
import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import Cookie from 'js-cookie';
import PropTypes from 'prop-types';

import Input from '../components/UI/Forms/Input/Input';
import device from '../lib/device';
import { signupUser, redirectIfAuthenticated, getToken } from '../lib/api/auth';
// import NavBar from '../components/UI/NavBar';

const initialState = {
  // to be used for clearing the form for another input
  username: '',
  email: '',
  password: '',
  nameError: '',
  emailError: '',
  passwordError: '',
  formErrorMessage: '',
  isLoading: false,
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
      isLoading: false, // to prevent multiple requests during submission
    }

    static propTypes = {
      // authenticated: PropTypes.bool.isRequired,
      router: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
    };

    static getInitialProps(ctx) {
      if (redirectIfAuthenticated(ctx)) {
        return {};
      }
      const token = getToken(ctx);

      return {
        authenticated: !!token,
      };
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
          let error;
          // to prevent clicking button when form submission is in progress
          // disable login button after it is clicked
          this.setState({ isLoading: true });
          // returns a promise so should be handled accordingly
          signupUser(username, email, password)
            .then((result) => {
              response = result;
              error = result;
              // enable login button after we get reply from API
              this.setState({ isLoading: false });
              console.log('Response on Signup Page:', response);
              if (response.status) {
                // put the jwt token in a cookie to use for future requests
                Cookie.set('token', response.headers.authorization);
                console.log('Response headers set on cookie: ', Cookie.get('token'));
                // Send the user to the profile page using the returned token from the
                // signupUser function
                Router.push('/profile');
                // clear form if there's no error on the form
                this.setState(initialState);
              }
              if (error.response) {
                const errorMessage = error.response.data.message || error.message;
                console.log(`Error Response Message on Signup page: , Response Message:  ${error.response.data}, Request ${error.request}`);
                /* If there is a response because there might not be a response.response
                  (it may be undefiled) if I was blocked by a CORS issue or some other problem.
                  */
                console.log(`FormErrorMessage State: ${errorMessage}`);
                this.setState({ formErrorMessage: errorMessage });
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
          emailError, formErrorMessage, isLoading,
        } = this.state;

        // const { router, authenticated } = this.props;
        return (
          <React.Fragment>
            {/* <NavBar
              authenticated={authenticated}
              pathname={router.pathname}
            /> */}
            <S.Signup>
              <img className="side-img" alt="" src="/static/placeholder.jpg" />
              <h1 className="logo grid-item">Blog</h1>
              <h2 className="title grid-item">Get Started for Free</h2>
              <form className="grid-item signup-form" onSubmit={this.handleSignup} noValidate autoComplete="off">
                <Input
                  className="form-input"
                  onBlur={this.validateEmail}
                  error={emailError}
                  onChange={this.handleChange}
                  value={email}
                  type="email"
                  name="email"
                  placeholder="email@email.com"
                />
                <Input
                  className="form-input"
                  onBlur={this.validateUserName}
                  error={nameError}
                  onChange={this.handleChange}
                  value={username}
                  type="text"
                  name="username"
                  placeholder="Name"
                />
                <Input
                  className="form-input"
                  onBlur={this.validatePassword}
                  error={passwordError}
                  onChange={this.handleChange}
                  value={password}
                  type="password"
                  name="password"
                  placeholder="Your Password"
                />
                <div className="error-message">{formErrorMessage}</div>
                <div className="social-wrap">
                  <h3>OR</h3>
                  <h3>SIGN UP WITH</h3>
                  <svg className="google-logo" viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
                    <g fill="none" fillRule="evenodd">
                      <path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335" />
                      <path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4" />
                      <path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05" />
                      <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853" />
                      <path d="M0 0h18v18H0V0z" />
                    </g>
                  </svg>
                  <p>|</p>
                  <svg className="fb-logo" viewBox="0 0 32 32" role="presentation" aria-hidden="true" focusable="false">
                    <path d="m8 14.41v-4.17c0-.42.35-.81.77-.81h2.52v-2.08c0-4.84 2.48-7.31 7.42-7.35 1.65 0 3.22.21 4.69.64.46.14.63.42.6.88l-.56 4.06c-.04.18-.14.35-.32.53-.21.11-.42.18-.63.14-.88-.25-1.78-.35-2.8-.35-1.4 0-1.61.28-1.61 1.73v1.8h4.52c.42 0 .81.42.81.88l-.35 4.17c0 .42-.35.71-.77.71h-4.21v16c0 .42-.35.81-.77.81h-5.21c-.42 0-.8-.39-.8-.81v-16h-2.52a.78.78 0 0 1 -.78-.78" fillRule="evenodd" />
                  </svg>
                </div>
                <button className="submit-button" disabled={isLoading} type="submit">
                  {isLoading ? 'Submitting...' : 'Create Your Blogish Account' }
                </button>
              </form>
              <div className="register grid-item">
                <h5> Already have an account? </h5>
                <Link href="/login">
                  <a className="login-button"> LOGIN </a>
                </Link>
              </div>
              <footer className="footer grid-item">
                <p>
By Continuing to use this site you agree to the site&apos;s
                Terms of Service and Privacy Policy.

                </p>
                <p>&copy;2019 Blogish, Inc. All rights reserved.</p>
              </footer>
            </S.Signup>
          </React.Fragment>
        );
      }
}

export default withRouter(Signup);

const S = {};
S.Signup = styled.div`

box-sizing: border-box;
margin: auto;
font-family: "sans-serif";
text-align: center;
font-size: 1em;

@media ${device.mobile} { 
    /* max-width: 500px; */
  /* border: 5px solid red; */
  padding: 0% 5%;
  /* display: grid; */
  /* background-color: #2196F3; */
  /* height: 100vh; */
  width: 100%;
  display: flex;
  max-width: 450px;
  flex-direction: column;
  /* grid-template-columns: auto; */
  /* grid-template-rows: 0.5fr 0.5fr 4fr 0.5fr 1fr; */
  /* grid-template-rows: 10% 15% 50% 15% 10%; */
.grid-item {
  /* background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8); */
}

.logo {
  height: 1em;
}
.side-img {
  display: none;
}
.title {
  text-align: left;
  height: 1em;
}
.signup-form {
  display: flex;
  flex-direction: column;
  
}
.error-message {
  margin-top: 1em;
  color: red;
}
.login-button {
  text-decoration: none;
  color: #777;
  background-color: #fff;
  padding: 0.4em 1.5em;
  text-align: center;
  display: inline-block;
  border: 0.05em solid #777;
  border-radius: 1em;
  margin-left: 1em;
}

.google-logo {
  height:1em;
  width:1em;
  display:inline-block;
  margin-right: 0.6em;
}

.fb-logo {
  height:1em;
  width:1em;
  display:inline-block;
  fill:currentColor;
  margin-left: 0.5em;
}
.social-wrap p {
  display: inline-block;
}
.footer {
  font-style: italic;
  font-size: 0.8em;
  padding: 0.2em 1em;
  margin-top: auto;
}
.submit-button {
  width: 100%;
  margin-top: 1em;
  padding: 0.7em;
  background-color: #777;
  border-radius: 7px;
  color: white;
  margin-bottom: 1em;
}
.register h5 {
  display: inline-block;
  font-size: 1em;
}
& button:disabled {
  background-color: #cccccc;
}
  }

   @media ${device.notMobile} {
  /* border: 5px solid red; */
  padding: 0% 5%;
  /* background-color: #2196F3; */
  height: 100vh;
  width: 100%;
  display: grid;
  /* row-gap:2ch; */
  align-content: space-between;
  max-width: 1200px;
  grid-template-columns:repeat(auto-fit, 1fr);
  grid-template-rows: repeat(auto-fit,1fr);
  /* grid-template-rows: 0.5fr 0.5fr 4fr 0.5fr 1fr; */
  /* grid-template-rows: 10% 15% 50% 15% 10%; */
.grid-item {
  /* background-color: rgba(255, 255, 255, 0.8); 
  border: 1px solid rgba(0, 0, 0, 0.8); */
}
.logo {
  font-size: 2em;
  grid-column: 1/3;
  grid-row: 1/2;

}
.side-img {
  /* display: none; */
  height: 100%;
  max-width:100%;
  grid-column: 1/5;
  grid-row: 1/13;
}
.title {
  text-align: left;
  font-size: 2em;
  height: 1em;
  grid-row: 2/3;
  grid-column: 6/10;
}
.form-input:nth-child(1) {
  grid-row: 3/4;
  grid-column: 6/13;
}
.signup-form {
  display: flex;
  flex-direction: column;
  grid-row: 3/10;
  grid-column: 6/13;
}

.google-logo {
  height:2em;
  width:2em;
  display:inline-block;
  margin-right: 0.6em;
}

.fb-logo {
  height:2em;
  width:2em;
  display:inline-block;
  fill:currentColor;
  margin-left: 0.5em;
}
.social-wrap p {
  display: inline-block;
}
.submit-button {
  width: 15em;
  /* margin: 1em 5em; */
  padding: 0.7em;
  background-color: #777;
  border-radius: 5em;
  color: white;
  margin: auto;
}

.register {
  grid-column: 9/13;
  grid-row: 1/3;
}

.register h5 {
  display: inline-block;
  font-size: 1em;
}

.footer {
  font-style: italic;
  font-size: 0.8em;
  padding: 0.2em 1em;
  grid-column: 6/13;
  grid-row: 11/13;
  align-self: end;
}
.login-button {
  text-decoration: none;
  color: #777;
  background-color: #fff;
  padding: 0.4em 1.5em;
  text-align: center;
  display: inline-block;
  border: 0.05em solid #777;
  border-radius: 1em;
  margin-left: 1em;
}
  /* @media ${device.mobileLandscape} {
    overflow: scroll;
    height: 100%;
  } */
  }

  `;
