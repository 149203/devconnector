import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { login_user } from '../../actions/authActions'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import TextFieldGroup from '../common/TextFieldGroup'

class Login extends Component {
   constructor() {
      super()
      this.state = {
         email: '',
         password: '',
         errors: {},
      }
   }

   componentDidMount() {
      // if we are directed to this component and we are already logged in:
      if (this.props.auth.is_authenticated) {
         this.props.history.push('/dashboard')
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.auth.is_authenticated) {
         this.props.history.push('/dashboard') // if authenticated, direct to dashboard
      }

      if (nextProps.errors) {
         this.setState({ errors: nextProps.errors })
      }
   }

   onChange(e) {
      this.setState({ [e.target.name]: e.target.value }) // shorthand for a variable property name!
   }

   onSubmit(e) {
      e.preventDefault() // because this is a form
      const { email, password } = this.state
      const user_data = { email, password }
      console.log(user_data)
      this.props.login_user(user_data)
   }

   render() {
      const { errors } = this.state

      return (
         <div className="login">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <h1 className="display-4 text-center">Log In</h1>
                     <p className="lead text-center">
                        Sign in to your DevConnector account
                     </p>
                     <form onSubmit={e => this.onSubmit(e)}>
                        <TextFieldGroup
                           placeholder="Email address"
                           name="email"
                           type="email"
                           error={errors.email}
                           value={this.state.email}
                           onChange={e => this.onChange(e)}
                        />

                        <TextFieldGroup
                           placeholder="Password"
                           name="password"
                           type="password"
                           error={errors.password}
                           value={this.state.password}
                           onChange={e => this.onChange(e)}
                        />

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

Login.propTypes = {
   login_user: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired,
} // Type-checking in React (optional)

const map_state_to_props = state => ({
   auth: state.auth,
   errors: state.errors,
}) // wrap the return in () to use arrow function syntax for return shortcut
export default connect(map_state_to_props, { login_user })(Login)
