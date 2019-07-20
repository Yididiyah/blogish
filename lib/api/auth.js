/* eslint-disable no-console */
import axios from 'axios';

// axios.defaults.headers.common['Authorization'] =
//                                 'Bearer ' + localStorage.getItem('jwtToken');

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
  const { data } = await axios.get('https://im-medium-clone-api.herokuapp.com/api/users/me');
  return data;
};
