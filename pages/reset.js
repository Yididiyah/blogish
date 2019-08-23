
import styled from 'styled-components';
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

import redirect from '../lib/redirect';
import Input from '../components/UI/Forms/Input/Input';
import device from '../lib/device';
import { resetNewPassword } from '../lib/api/auth';

const initialState = {
  passwordError: '',
  password: '',
  isLoading: false,
  formErrorMessage: '',
};

class Reset extends Component {
    state = {
      passwordError: '',
      isLoading: false,
      formErrorMessage: '',
      password: '',
      resetSuccessful: false,
    }

    static propTypes = {
      router: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
      query: PropTypes.shape({
        id: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
      }).isRequired,
    };

    static async getInitialProps({ query }) {
      console.log(query);

      return { query };
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

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
      event.preventDefault();
      let response;
      let error;
      const { password } = this.state;
      const { query } = this.props;
      const { id, token } = query;
      console.log(`Id and Token from URL: ID: ${id}, Token ${token}`);

      const passwordValid = this.validatePassword(password);

      if (passwordValid) {
        this.setState({ isLoading: true });
        console.log('Password Valid');
        resetNewPassword(id, token, password)
          .then((result) => {
            response = result;
            error = result;
            this.setState({ isLoading: false });
            console.log('Reset Password Page Response: ', result);

            if (response.status) {
              // Successful
              console.log('Success on Reset Password Page: ', response);
              this.setState({ resetSuccessful: true });
              this.setState(initialState);
              setTimeout(() => {
                redirect('/login');
              }, 2000);
            }
            if (error.response) {
              // Failed
              console.log('Failure on Reset Password Page: ', error.response.data);
              this.setState({ formErrorMessage: error.response.data.message });
            }
          });
      }
    }


    render() {
      const {
        password, passwordError, isLoading, formErrorMessage, resetSuccessful,
      } = this.state;
      return (
        <React.Fragment>
          {resetSuccessful
            ? (
              <S.Reset>
                <h2>Your Password Reset Was Successful </h2>
              </S.Reset>
            )
            : (
              <S.Reset>
                <h2>Reset Password</h2>
                <p>
Your password needs to have at least 8 characters.
                </p>
                <h3>Password</h3>
                <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                  <Input
                    onBlur={this.validatePassword}
                    error={passwordError}
                    value={password}
                    onChange={this.handleChange}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <div>{formErrorMessage}</div>
                  <button disabled={isLoading} type="submit">{isLoading ? 'Submitting...' : 'Submit' }</button>
                </form>
              </S.Reset>
            )
          }
        </React.Fragment>
      );
    }
}

export default withRouter(Reset);

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
