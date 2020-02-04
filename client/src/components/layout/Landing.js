import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' // allows connecting redux to this react component

class Landing extends Component {
   componentDidMount() {
      // if we are directed to this component and we are already logged in:
      if (this.props.auth.is_authenticated) {
         this.props.history.push('/dashboard')
      }
   }
   render() {
      return (
         <div className="landing">
            <div className="dark-overlay landing-inner text-light">
               <div className="container">
                  <div className="row">
                     <div className="col-md-12 text-center">
                        <h1 className="display-3 mb-4">Developer Connector</h1>
                        <p className="lead">
                           {' '}
                           Create a developer profile/portfolio, share posts and
                           get help from other developers
                        </p>
                        <hr />
                        <Link
                           to="/register"
                           className="btn btn-lg btn-info mr-2"
                        >
                           Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-lg btn-light">
                           Login
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

Landing.propTypes = {
   auth: PropTypes.object.isRequired,
} // Type-checking in React (optional)

const map_state_to_props = state => ({
   auth: state.auth, // we named auth in our root reducer (reducers/index.js)
}) // wrap the return in () to use arrow function syntax for return shortcut
export default connect(map_state_to_props)(Landing)
