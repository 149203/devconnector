import axios from 'axios'
import {
   GET_PROFILE,
   PROFILE_LOADING,
   CLEAR_CURRENT_PROFILE,
   GET_ERRORS,
   SET_CURRENT_USER,
   GET_PROFILES,
} from './types'

// Get current profile
export const get_current_profile = () => dispatch => {
   dispatch(set_profile_loading())
   axios
      .get('/api/profile')
      .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
      .catch(err => dispatch({ type: GET_PROFILE, payload: {} })) // if there is an error (because the user has no profile), get and empty profile by passing an empty object as the payload
}

// Get profile by handle
export const get_profile_by_handle = handle => dispatch => {
   dispatch(set_profile_loading())
   axios
      .get(`/api/profile/handle/${handle}`)
      .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
      .catch(err => dispatch({ type: GET_PROFILE, payload: null })) // if there is an error (because the user has no profile), get and empty profile by passing an empty object as the payload
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

// Create profile
export const create_profile = (profile_data, history) => dispatch => {
   axios
      .post('api/profile', profile_data)
      .then(res => {
         history.push('/dashboard')
      })
      .catch(err =>
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
         })
      )
}

// Add experience
export const add_experience = (experience_data, history) => dispatch => {
   axios
      .post('api/profile/experience', experience_data)
      .then(res => {
         history.push('/dashboard')
      })
      .catch(err =>
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
         })
      )
}

// Add education
export const add_education = (education_data, history) => dispatch => {
   axios
      .post('api/profile/education', education_data)
      .then(res => {
         history.push('/dashboard')
      })
      .catch(err =>
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
         })
      )
}

// Get all profiles
export const get_profiles = () => dispatch => {
   dispatch(set_profile_loading()) // dispatch a loading action while waiting for axios request
   axios
      .get('api/profile/all')
      .then(res =>
         dispatch({
            type: GET_PROFILES,
            payload: res.data,
         })
      )
      .catch(err =>
         dispatch({
            type: GET_PROFILES,
            payload: null, // it's ok to not have any profiles
         })
      )
}

// Delete experience
export const delete_experience = id => dispatch => {
   if (window.confirm('Are you sure? This cannot be undone.')) {
      axios
         .delete(`api/profile/experience/${id}`)
         .then(res =>
            dispatch({
               type: GET_PROFILE,
               payload: res.data, // the API returns the profile after we delete it
            })
         )
         .catch(err =>
            dispatch({
               type: GET_ERRORS,
               payload: err.response.data,
            })
         )
   }
}

// Delete education
export const delete_education = id => dispatch => {
   if (window.confirm('Are you sure? This cannot be undone.')) {
      axios
         .delete(`api/profile/education/${id}`)
         .then(res =>
            dispatch({
               type: GET_PROFILE,
               payload: res.data, // the API returns the profile after we delete it
            })
         )
         .catch(err =>
            dispatch({
               type: GET_ERRORS,
               payload: err.response.data,
            })
         )
   }
}

// Delete profile and user
export const delete_account = () => dispatch => {
   if (window.confirm('Are you sure? This cannot be undone.')) {
      axios
         .delete('api/profile')
         .then(res =>
            dispatch({
               // on a successful delete
               type: SET_CURRENT_USER,
               payload: {}, // set the current user to an empty obj
            })
         )
         .catch(err =>
            dispatch({
               type: GET_ERRORS,
               payload: err.response.data,
            })
         )
   }
}
