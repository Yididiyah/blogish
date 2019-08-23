/* eslint-disable no-console */
import axios from 'axios';

import redirect from '../redirect';
import { getCookie, removeCookie } from '../cookie';

export const loginUser = async (email, password) => {
  try {
    const result = await axios.post('https://im-medium-clone-api.herokuapp.com/api/auth/signin', { email, password });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const signupUser = async (username, email, password) => {
  try {
    const result = await axios.post('https://im-medium-clone-api.herokuapp.com/api/auth/signup', { email, password, username });
    // console.log(result);
    // console.log(result.status);
    return result;
  } catch (error) {
    // console.log(error);
    // console.log(`Error Status: ${error.response.status}`);
    return error;
  }
};

export const sendResetLink = async (email) => {
  try {
    const result = await axios.post('https://im-medium-clone-api.herokuapp.com/api/auth/forgotpassword', { email });
    console.log('Reset Link Result: ', result);
    return result;
  } catch (error) {
    console.log('Reset Link Error', error);
    return error;
  }
};

export const resetNewPassword = async (id, token, password) => {
  try {
    const result = await axios.post('https://im-medium-clone-api.herokuapp.com/api/auth/resetpassword', { id, token, password });
    console.log('Reset New Password Success Response: ', result);
    return result;
  } catch (error) {
    console.log('Reset New Password Error', error);
    return error;
  }
};

export const getUserProfile = async (ctx) => {
  try {
    const { data } = await axios.get('https://im-medium-clone-api.herokuapp.com/api/users/me', {
      headers: {
        Authorization: `Bearer ${getCookie('token', ctx)}`,
      },
    });
    // console.log('auth-token in auth.js : ', Cookie.get('auth-token'));
    return data;
  } catch (error) {
    return error;
  }
};
export const getToken = ctx => getCookie('token', ctx.req);

export const isAuthenticated = ctx => !!getToken(ctx);

export const redirectIfAuthenticated = (ctx) => {
  if (isAuthenticated(ctx)) {
    redirect('/profile', ctx);
    return true;
  }
  return false;
};

export const redirectIfNotAuthenticated = (ctx) => {
  if (!isAuthenticated(ctx)) {
    redirect('/login', ctx);
    return true;
  }
  return false;
};

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie('token');
    redirect('/login', ctx);
  }
};
