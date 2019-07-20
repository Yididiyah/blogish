/* eslint-disable no-console */
import axios from 'axios';
import Cookie from 'js-cookie';

export const loginUser = async (email, password) => axios.post('https://im-medium-clone-api.herokuapp.com/api/auth/signin', { email, password });


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

export const getUserProfile = async () => {
  try {
    const { data } = await axios.get('https://im-medium-clone-api.herokuapp.com/api/users/me', {
      headers: {
        Authorization: `Bearer${Cookie.get('auth-token')}`,
      },
    });
    // console.log('auth-token in auth.js : ', Cookie.get('auth-token'));
    return data;
  } catch (error) {
    return error;
  }
};
