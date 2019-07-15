/* eslint-disable no-console */
import axios from 'axios';

export const loginUser = async (email, password) => axios.post('https://im-medium-clone-api.herokuapp.com/api/auth/signin', { email, password });


export const signupUser = async (username, email, password) => axios.post('https://im-medium-clone-api.herokuapp.com/api/auth/signup', { email, password, username })
  .catch((error) => {
    console.log(`Auth.js Error Response ${error}`);
    return error;
  });

// .then((response) => {
//   console.log(`Auth.js Data Response ${response}`);
//   return response;
// })
