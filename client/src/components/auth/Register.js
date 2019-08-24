import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { register_user } from '../../actions/authActions'

class Register extends Component {
   constructor() {
      super()
      this.state = {
         name: '',
         email: '',
         password: '',
         password2: '',
         errors: {},
      }
   }

   onChange(e) {
      this.setState({ [e.target.name]: e.target.value }) // shorthand for a variable property name!
   }

   onSubmit(e) {
      e.preventDefault() // because this is a form
      const { name, email, password, password2 } = this.state
      const new_user = { name, email, password, password2 }
      this.props.register_user(new_user)
      // console.log(new_user)
      // axios POST!
      // axios
      //    .post('/api/users/register', new_user) // recall we put a PROXY value in our client package.json
      //    .then(res => console.log(res.data))
      //    .catch(err => this.setState({ errors: err.response.data }))
   }

   render() {
      const { errors } = this.state
      const { user } = this.props.auth
      return (
         <div className="register">
            {user ? user.name : null}
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <h1 className="display-4 text-center">Sign Up</h1>
                     <p className="lead text-center">
                        Create your DevConnector account
                     </p>
                     <form
                        noValidate // noValidate turns off HTML5 validation
                        onSubmit={e => this.onSubmit(e)}
                     >
                        <div className="form-group">
                           <input
                              type="text"
                              // classnames param 1 = default classNames
                              // classnames param 2 = className IF property is true
                              className={classnames(
                                 'form-control form-control-lg',
                                 { 'is-invalid': errors.name }
                              )}
                              placeholder="Name"
                              name="name"
                              value={this.state.name}
                              onChange={e => this.onChange(e)}
                           />
                           {errors.name && ( // if errors.name
                              <div className="invalid-feedback">
                                 {errors.name}
                              </div>
                           )}
                        </div>
                        <div className="form-group">
                           <input
                              type="email"
                              className={classnames(
                                 'form-control form-control-lg',
                                 { 'is-invalid': errors.email }
                              )}
                              placeholder="Email Address"
                              name="email"
                              value={this.state.email}
                              onChange={e => this.onChange(e)}
                           />
                           {errors.email && ( // if errors.email
                              <div className="invalid-feedback">
                                 {errors.email}
                              </div>
                           )}
                           <small className="form-text text-muted">
                              This site uses Gravatar so if you want a profile
                              image, use a Gravatar email
                           </small>
                        </div>
                        <div className="form-group">
                           <input
                              type="password"
                              className={classnames(
                                 'form-control form-control-lg',
                                 { 'is-invalid': errors.password }
                              )}
                              placeholder="Password"
                              name="password"
                              value={this.state.password}
                              onChange={e => this.onChange(e)}
                           />
                           {errors.password && ( // if errors.password
                              <div className="invalid-feedback">
                                 {errors.password}
                              </div>
                           )}
                        </div>
                        <div className="form-group">
                           <input
                              type="password"
                              className={classnames(
                                 'form-control form-control-lg',
                                 { 'is-invalid': errors.password2 }
                              )}
                              placeholder="Confirm Password"
                              name="password2"
                              value={this.state.password2}
                              onChange={e => this.onChange(e)}
                           />
                           {errors.password2 && ( // if errors.password2
                              <div className="invalid-feedback">
                                 {errors.password2}
                              </div>
                           )}
                        </div>
                        <input
                           type="submit"
                           className="btn btn-info btn-block mt-4"
                        />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

Register.propTypes = {
   register_user: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
} // Type-checking in React (optional)

const map_state_to_props = state => ({
   auth: state.auth, // we named auth in our root reducer (reducers/index.js)
}) // wrap the return in () to use arrow function syntax for return shortcut

export default connect(
   map_state_to_props,
   { register_user }
)(Register)
