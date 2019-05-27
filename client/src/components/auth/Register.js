import React, { Component } from 'react'
import axios from 'axios'

export default class Register extends Component {
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
      console.log(new_user)
      // axios POST!
      axios
         .post('/api/users/register', new_user) // recall we put a PROXY value in our client package.json
         .then(res => console.log(res.data))
         .catch(err => console.log(err.response.data))
   }

   render() {
      return (
         <div className="register">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <h1 className="display-4 text-center">Sign Up</h1>
                     <p className="lead text-center">
                        Create your DevConnector account
                     </p>
                     <form onSubmit={e => this.onSubmit(e)}>
                        <div className="form-group">
                           <input
                              type="text"
                              className="form-control form-control-lg"
                              placeholder="Name"
                              name="name"
                              value={this.state.name}
                              onChange={e => this.onChange(e)}
                           />
                        </div>
                        <div className="form-group">
                           <input
                              type="email"
                              className="form-control form-control-lg"
                              placeholder="Email Address"
                              name="email"
                              value={this.state.email}
                              onChange={e => this.onChange(e)}
                           />
                           <small className="form-text text-muted">
                              This site uses Gravatar so if you want a profile
                              image, use a Gravatar email
                           </small>
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
                        <div className="form-group">
                           <input
                              type="password"
                              className="form-control form-control-lg"
                              placeholder="Confirm Password"
                              name="password2"
                              value={this.state.password2}
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
