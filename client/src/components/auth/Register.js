import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { register_user } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'

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

   componentDidMount() {
      // if we are directed to this component and we are already logged in:
      if (this.props.auth.is_authenticated) {
         this.props.history.push('/dashboard')
      }
   }

   componentWillReceiveProps(nextProps) {
      // deprecated way of passing props into component state
      // once we receive new properties, update component state
      if (nextProps.errors) {
         // if there is errors
         this.setState({ errors: nextProps.errors })
      }
   }

   onChange(e) {
      this.setState({ [e.target.name]: e.target.value }) // shorthand for a variable property name!
   }

   onSubmit(e) {
      e.preventDefault() // because this is a form
      const { name, email, password, password2 } = this.state
      const new_user = { name, email, password, password2 }
      this.props.register_user(new_user, this.props.history) // use new_user data and this.props.history in the register_user action // uses withRouter at the bottom of the page
   }

   render() {
      const { errors } = this.state
      return (
         <div className="register">
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
                        <TextFieldGroup
                           placeholder="Name"
                           name="name"
                           type="text"
                           error={errors.name}
                           value={this.state.name}
                           onChange={e => this.onChange(e)}
                        />

                        <TextFieldGroup
                           placeholder="Email Address"
                           name="email"
                           type="email"
                           error={errors.email}
                           value={this.state.email}
                           onChange={e => this.onChange(e)}
                           info="Please use a Gravatar email address if you have one."
                        />

                        <TextFieldGroup
                           placeholder="Password"
                           name="password"
                           type="password"
                           error={errors.password}
                           value={this.state.password}
                           onChange={e => this.onChange(e)}
                        />

                        <TextFieldGroup
                           placeholder="Confirm Password"
                           name="password2"
                           type="password"
                           error={errors.password2}
                           value={this.state.password2}
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

Register.propTypes = {
   register_user: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired,
} // Type-checking in React (optional)

const map_state_to_props = state => ({
   auth: state.auth, // we named auth in our root reducer (reducers/index.js)
   errors: state.errors,
}) // wrap the return in () to use arrow function syntax for return shortcut
export default connect(map_state_to_props, { register_user })(
   withRouter(Register)
)
