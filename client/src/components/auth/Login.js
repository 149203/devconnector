import React, { Component } from 'react'

export default class Login extends Component {
   constructor() {
      super()
      this.state = {
         email: '',
         password: '',
         errors: {},
      }
   }

   onChange(e) {
      this.setState({ [e.target.name]: e.target.value }) // shorthand for a variable property name!
   }

   onSubmit(e) {
      e.preventDefault() // because this is a form
      const { email, password } = this.state
      const user = { email, password }
      console.log(user)
   }

   render() {
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
                        <div className="form-group">
                           <input
                              type="email"
                              className="form-control form-control-lg"
                              placeholder="Email Address"
                              name="email"
                              value={this.state.email}
                              onChange={e => this.onChange(e)}
                           />
                        </div>
                        <div className="form-group">
                           <input
                              type="password"
                              className="form-control form-control-lg"
                              placeholder="Password"
                              name="password"
                              value={this.state.password}
                              onChange={e => this.onChange(e)}
                           />
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
