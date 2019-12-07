import axios from 'axios'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import set_auth_token from '../utils/set_auth_token'
import jwt_decode from 'jwt-decode'

// Register user. This is called an action creator.
export const register_user = (user_data, history) => dispatch => {
   axios
      .post('/api/users/register', user_data) // recall we put a PROXY value in our client package.json
      .then(res => {
         console.log(res.data)
         history.push('/login') // uses Router that was passed in
      })
      .catch(err => {
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
         })
      })
   // return {
   //    // an action creator must, at minimum, return a type
   //    type: TEST_DISPATCH,
   //    payload: user_data,
   // }
}

// Login - get user token

export const login_user = user_data => dispatch => {
   axios
      .post('/api/users/login', user_data)
      .then(res => {
         // save user token to local storage
         const { token } = res.data
         // localStorage stores key-value pairs
         // but they must be strings
         localStorage.setItem('jwt_token', token)
         // set token to the header to authorize
         set_auth_token(token)
         // the token has user data encrypted in it
         // we use jwt_decode to decrypt this data
         const decoded_token = jwt_decode(token)
         // set the current user with data from decoded_token
         dispatch(set_current_user(decoded_token))
      })
      .catch(err => {
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
         })
      })
}

// Set the current user to the user in the token

export const set_current_user = decoded_token => {
   return {
      type: SET_CURRENT_USER,
      payload: decoded_token,
   }
}
