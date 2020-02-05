import {
   GET_PROFILE,
   PROFILE_LOADING,
   CLEAR_CURRENT_PROFILE,
} from '../actions/types'

const initial_state = {
   profile: null,
   profiles: null,
   loading: false,
}

// exports a function
export default function(state = initial_state, action) {
   switch (action.type) {
      // will have different cases for action types
      case CLEAR_CURRENT_PROFILE:
         return {
            ...state,
            profile: null,
         }
      case PROFILE_LOADING:
         return {
            ...state,
            loading: true,
         }
      case GET_PROFILE:
         return {
            ...state,
            profile: action.payload,
            loading: false,
         }
      default:
         return state
   }
}
