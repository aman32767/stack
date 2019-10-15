import * as actionTypes from './actionTypes';
import axios from 'axios'
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password,isSignup) => {
  return dispatch => {
    dispatch(authStart()); 
    const authData = {
      email:email,
      password:password,
      returnSecureToken:true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCA6CuqtL6B3wxRx3EKXtb2Q6tVhXI3a3A'
    if(!isSignup)
    {
      url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCA6CuqtL6B3wxRx3EKXtb2Q6tVhXI3a3A'
    }
    axios.post(url,authData)
    .then(response=>{
      dispatch(authSuccess(response.data))
    })
    .catch(error=>{
      dispatch(authFail(error))
    })
  };
};
