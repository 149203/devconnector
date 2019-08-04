const initial_state = {
   is_authenticated: false,
   user: {},
}

// exports a function

export default function(state = initial_state, action) {
   switch (action.type) {
      // will have different cases for action types
      default:
         return state
   }
}
