import axios from 'axios'
import { GET_ERRORS } from './types'

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
