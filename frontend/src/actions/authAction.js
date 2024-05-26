import axios from 'axios';

import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/authConstant";
import { toast } from 'react-toastify';


export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});
export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

//register user

export const createUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_USER_REQUEST });

    // Check if the user with the provided email already exists
    const existingUser = await axios.get(`http://localhost:5000/api/user/check?email=${userData.email}`);

    if (existingUser.data.exists) {
      toast.error('User with this email already exists');
      return { error: true };
    }

    // If user doesn't exist, proceed with user creation
    const { data } = await axios.post('http://localhost:5000/api/user/register', userData);

    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: data,
    });
    toast.success('User created successfully');
    return { error: false }; // Return an object with error set to false for success
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
    toast.error('Failed to create user');
    return { error: true }; // Return an object with error set to true for failure
  }
};




//login user 
export const login = (userData) => async (dispatch) => {
  console.log(userData, 'userData auth')
  dispatch(loginRequest());
  try {
    const response = await axios.post('http://localhost:5000/api/user/login', userData);
    // console.log(response,'api call check')
    console.log('Response Data:', response.data);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
    console.log('Error While Login')
  }
};

export const initializeUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const userDataString = localStorage.getItem('user');

  if (token && userDataString !== null) { // Check if userDataString is not null
      try {
          const user = JSON.parse(userDataString); // Parse user data if it's a valid JSON string
          dispatch(loginSuccess({ token, user }));
      } catch (error) {
          console.error('Error parsing user data:', error);
          dispatch(loginFailure());
      }
  } else {
      dispatch(loginFailure());
  }
};


