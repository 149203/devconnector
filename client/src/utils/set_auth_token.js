// set a default header for axios
// if we're logged in, it's going to always send this authorization header

import axios from 'axios'

const set_auth_token = token => {
   if (token) {
      // if it exists, apply the authorization token to every request using an Axios method
      axios.defaults.headers.common['Authorization'] = token
   } else {
      // delete the authorization token from the header
      delete axios.defaults.headers.common['Authorization']
   }
}

export default set_auth_token
