import { TEST_DISPATCH } from '../actions/types'

const initial_state = {
   is_authenticated: false,
   user: {},
}

// exports a function

export default function(state = initial_state, action) {
   switch (action.type) {
      // will have different cases for action types
      case TEST_DISPATCH:
         return {
            ...state, // a copy of state
            user: action.payload,
         }
      default:
         return state
   }
}
