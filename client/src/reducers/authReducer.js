import { SET_CURRENT_USER } from '../actions/types'
import is_empty from '../validation/is_empty'

const initial_state = {
   is_authenticated: false,
   user: {},
}

// exports a function
export default function(state = initial_state, action) {
   switch (action.type) {
      // will have different cases for action types
      case SET_CURRENT_USER:
         return {
            ...state,
            is_authenticated: !is_empty(action.payload), // returns false if the object is empty (no authenticated user data), and true if there is a user object
            user: action.payload,
         }
      default:
         return state
   }
}
