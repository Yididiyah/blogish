import React, { Component } from 'react';
import styled from 'styled-components';
import Input from './Input/Input';
import { device } from '../../../lib/device';
import { loginUser } from '../../../lib/auth';

class Login extends Component {
  state={
    email: '',
    password: '',
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    loginUser(email, password);
  }

  render() {
    return (
      <S.Login>
        <h1>Login</h1>
        <form onSubmit={this.handleLogin}>
          <Input onChange={this.handleChange} type="email" name="email" placeholder="Email Address" />
          <Input onChange={this.handleChange} type="password" name="password" placeholder="Password" />
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
