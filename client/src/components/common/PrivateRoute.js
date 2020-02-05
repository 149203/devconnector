import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
   <Route
      {...rest}
      render={props => {
         if (auth.is_authenticated === true) {
            return <Component {...props} />
         } else {
            return <Redirect to="/login" />
         }
      }}
   />
)

PrivateRoute.propTypes = {
   auth: PropTypes.object.isRequired,
}

const map_state_to_props = state => ({
   auth: state.auth,
})

export default connect(map_state_to_props)(PrivateRoute)
