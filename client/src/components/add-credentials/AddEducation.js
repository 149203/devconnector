import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { add_education } from '../../actions/profileActions'

class AddEducation extends Component {
   constructor(props) {
      super(props)
      this.state = {
         school: '',
         degree: '',
         fieldofstudy: '',
         from: '',
         to: '',
         current: false,
         description: '',
         errors: {},
         disabled: false,
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
         this.setState({ errors: nextProps.errors })
      }
   }

   on_submit(e) {
      e.preventDefault()

      const education_data = {
         school: this.state.school,
         degree: this.state.degree,
         fieldofstudy: this.state.fieldofstudy,
         from: this.state.from,
         to: this.state.to,
         current: this.state.current,
         description: this.state.description,
      }

      this.props.add_education(education_data, this.props.history)
   }

   on_change(e) {
      this.setState({ [e.target.name]: e.target.value })
   }

   on_check(e) {
      this.setState({
         disabled: !this.state.disabled,
         current: !this.state.current,
      })
   }

   render() {
      const { errors } = this.state

      return (
         <div className="add-education">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <Link to="/dashboard" className="btn btn-light">
                        Go Back
                     </Link>
                     <h1 className="display-4 text-center">Add Education</h1>
                     <p className="lead text-center">
                        Add any school, bootcamp, etc that you have attended
                     </p>
                     <small className="d-block pb-3">* = required fields</small>
                     <form onSubmit={e => this.on_submit(e)}>
                        <TextFieldGroup
                           placeholder="* School"
                           name="school"
                           value={this.state.school}
                           onChange={e => this.on_change(e)}
                           error={errors.school}
                        />
                        <TextFieldGroup
                           placeholder="* Degree or Certification"
                           name="degree"
                           value={this.state.degree}
                           onChange={e => this.on_change(e)}
                           error={errors.degree}
                        />
                        <TextFieldGroup
                           placeholder="* Field of Study"
                           name="fieldofstudy"
                           value={this.state.fieldofstudy}
                           onChange={e => this.on_change(e)}
                           error={errors.fieldofstudy}
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
                           placeholder="Program Description"
                           name="description"
                           value={this.state.description}
                           onChange={e => this.on_change(e)}
                           error={errors.description}
                           info="Tell us about the program that you were in"
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

AddEducation.propTypes = {
   add_education: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
   profile: state.profile,
   errors: state.errors,
})

export default connect(mapStateToProps, { add_education })(
   withRouter(AddEducation)
)
