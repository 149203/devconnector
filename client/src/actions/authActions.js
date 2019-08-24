import { TEST_DISPATCH } from './types'

// Register user. This is called an action creator.
export const register_user = user_data => {
   return {
      // an action creator must, at minimum, return a type
      type: TEST_DISPATCH,
      payload: user_data,
   }
}
