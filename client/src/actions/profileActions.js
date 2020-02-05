import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types'

// Get current profile
export const get_current_profile = () => dispatch => {
   dispatch(set_profile_loading())
   axios
      .get('/api/profile')
      .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
      .catch(err => dispatch({ type: GET_PROFILE, payload: {} })) // if there is an error (because the user has no profile), get and empty profile by passing an empty object as the payload
}

// Set profile loading
export const set_profile_loading = () => {
   return {
      type: PROFILE_LOADING,
   }
}

// Clear profile
export const clear_current_profile = () => {
   return {
      type: CLEAR_CURRENT_PROFILE,
   }
}
