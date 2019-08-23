import styled from 'styled-components';
import React, { Component } from 'react';

import Input from '../components/UI/Forms/Input/Input';
import device from '../lib/device';
import { sendResetLink } from '../lib/api/auth';

const initialState = {
  emailError: '',
  email: '',
  isLoading: false,
  formErrorMessage: '',
};

class forgotPassword extends Component {
    state = {
      emailError: '',
      email: '',
      isLoading: false,
      formErrorMessage: '',
      resetLinkSent: false,
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

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
      event.preventDefault();
      let response;
      let error;
      const { email } = this.state;
      console.log('Form submitted');

      const emailValid = this.validateEmail(email);

      if (emailValid) {
        this.setState({ isLoading: true });
        console.log('Email Valid');
        sendResetLink(email)
          .then((result) => {
            response = result;
            error = result;
            this.setState({ isLoading: false });
            console.log('Forgot Password Page Response: ', result);

            if (response.status) {
              // Successful
              console.log('Success on Reset: ', response);
              this.setState({ resetLinkSent: true });
              this.setState(initialState);
            }
            if (error.response) {
              // Failed
              console.log('Failure on Reset: ', error.response.data);
              this.setState({ formErrorMessage: error.response.data.message });
            }
          });
      }
    }

    render() {
      const {
        email, emailError, isLoading, formErrorMessage, resetLinkSent,
      } = this.state;
      return (
        <React.Fragment>

          { resetLinkSent ? (
            <S.Reset>
              <h2>Reset Link Sent, Please check your email.</h2>
            </S.Reset>
          )
            : (
              <S.Reset>
                <h2>Reset Password</h2>
                <p>
Enter the email address associated with your account,
       and we’ll email you a link to reset your password.
                </p>
                <h3>Email Address</h3>
                <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                  <Input
                    onBlur={this.validateEmail}
                    error={emailError}
                    value={email}
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    placeholder="Email Address"
                  />
                  <div>{formErrorMessage}</div>
                  <button disabled={isLoading} type="submit">{isLoading ? 'Sending Link...' : 'Send Reset Link' }</button>
                </form>
              </S.Reset>
            )
}
          {' '}

        </React.Fragment>
      );
    }
}

export default forgotPassword;

const S = {};
S.Reset = styled.div`
  margin: auto;
  font-family: "sans-serif";
  text-align: center;
  border-style: groove;
  padding: 15px;

  & button {
  width: 60%;
  margin-top: 15px;
  padding: 10px;
  background-color: red;
  border-radius: 7px;
  color: white;
  
}
& h3 {
    text-align: left;
}
& div {
  font-size: 16px;
  color: red;
}
& button:disabled {
  background-color: #cccccc;
}

  @media ${device.mobileM}{
    max-width: 300px;
  }

  @media ${device.laptop} { 
    max-width: 500px;
  } 

`;
