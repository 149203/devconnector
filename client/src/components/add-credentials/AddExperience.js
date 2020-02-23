import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class AddExperience extends Component {
   constructor(props) {
      super(props)
      this.state = {
         company: '',
         title: '',
         location: '',
         from: '',
         to: '',
         current: false,
         description: '',
         errors: {},
         disabled: false,
      }
   }

   on_submit(e) {
      e.preventDefault()
      console.log('submitted!')
   }

   on_change(e) {
      this.setState({ [e.target.name]: e.target.value })
   }

   on_check(e) {
      this.setState({
         // this is a quick way to toggle state: set it to it's opposite
         disabled: !this.state.disabled,
         current: !this.state.current,
      })
   }

   render() {
      const { errors } = this.state
      return (
         <div className="add-experience">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <Link to="/dashboard" className="btn btn-light">
                        Go Back
                     </Link>
                     <h1 className="display-4 text-center">Add Experience</h1>
                     <p className="lead text-center">
                        Add any job or position that you have had in the past,
                        or your current position
                     </p>
                     <small className="d-block pb-3">* = required fields</small>
                     <form onSubmit={e => this.on_submit(e)}>
                        <TextFieldGroup
                           placeholder="* Company"
                           name="company"
                           value={this.state.company}
                           onChange={e => this.on_change(e)}
                           error={errors.company}
                        />
                        <TextFieldGroup
                           placeholder="* Job Title"
                           name="title"
                           value={this.state.title}
                           onChange={e => this.on_change(e)}
                           error={errors.title}
                        />
                        <TextFieldGroup
                           placeholder="Location"
                           name="location"
                           value={this.state.location}
                           onChange={e => this.on_change(e)}
                           error={errors.location}
                        />
                        <h6>From Date</h6>
                        <TextFieldGroup
                           name="from"
                           type="date"
                           value={this.state.from}
                           onChange={e => this.on_change(e)}
                           error={errors.from}
                        />
                        <h6>To Date</h6>
                        <TextFieldGroup
                           name="to"
                           type="date"
                           value={this.state.to}
                           onChange={e => this.on_change(e)}
                           error={errors.to}
                           disabled={this.state.disabled ? 'disabled' : ''}
                        />
                        <div className="form-check mb-4">
                           <input
                              type="checkbox"
                              className="form-check-input"
                              name="current"
                              value={this.state.current}
                              checked={this.state.current}
                              onChange={e => this.on_check(e)}
                              id="current"
                           />
                           <label
                              htmlFor="current"
                              className="form-check-label"
                           >
                              Current Job
                           </label>
                        </div>
                        <TextAreaFieldGroup
                           placeholder="Job Description"
                           name="description"
                           value={this.state.description}
                           onChange={e => this.on_change(e)}
                           error={errors.description}
                           info="Tell us about the the position"
                        />
                        <input
                           type="submit"
                           value="Submit"
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

AddExperience.propTypes = {
   profile: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired,
}

const map_state_to_props = state => ({
   profile: state.profile,
   errors: state.errors,
})

export default connect(map_state_to_props)(withRouter(AddExperience))
