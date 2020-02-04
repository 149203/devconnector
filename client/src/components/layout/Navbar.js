// Keyboard shortcut: rfc tab or rcc tab
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { logout_user } from '../../actions/authActions'

class Navbar extends Component {
   on_logout_click(e) {
      e.preventDefault()
      this.props.logout_user()
   }

   render() {
      const { is_authenticated, user } = this.props.auth

      const auth_links = (
         <ul className="navbar-nav ml-auto">
            <li className="nav-item">
               <a
                  href=""
                  className="nav-link"
                  onClick={this.on_logout_click.bind(this)}
               >
                  <img
                     className="rounded-circle"
                     src={user.avatar}
                     alt={user.name}
                     title="Your Gravatar image"
                     style={{ width: '25px', marginRight: '5px' }}
                  ></img>
                  &nbsp;Log out
               </a>
            </li>
         </ul>
      )

      const guest_links = (
         <ul className="navbar-nav ml-auto">
            <li className="nav-item">
               <Link className="nav-link" to="/register">
                  Sign Up
               </Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link" to="/login">
                  Login
               </Link>
            </li>
         </ul>
      )

      return (
         <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
               <Link className="navbar-brand" to="/">
                  DevConnector
               </Link>
               <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#mobile-nav"
               >
                  <span className="navbar-toggler-icon" />
               </button>

               <div className="collapse navbar-collapse" id="mobile-nav">
                  <ul className="navbar-nav mr-auto">
                     <li className="nav-item">
                        <Link className="nav-link" to="/profiles">
                           {' '}
                           Developers
                        </Link>
                     </li>
                  </ul>
                  {is_authenticated ? auth_links : guest_links}
               </div>
            </div>
         </nav>
      )
   }
}

Navbar.propTypes = {
   logout_user: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
}

const map_state_to_props = state => ({
   auth: state.auth,
})

export default connect(map_state_to_props, { logout_user })(Navbar)
