import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'

class CreateProfile extends Component {
   constructor(props) {
      super(props)
      this.state = {
         display_social_inputs: false,
         handle: '',
         company: '',
         website: '',
         location: '',
         status: '',
         skills: '',
         githubusername: '',
         bio: '',
         twitter: '',
         facebook: '',
         linkedin: '',
         youtube: '',
         instagram: '',
         errors: {},
      }
   }

   on_submit(e) {
      e.preventDefault()
      console.log('submit')
   }

   on_change(e) {
      this.setState({ [e.target.name]: e.target.value })
   }

   render() {
      const { errors, display_social_inputs } = this.state

      let social_inputs
      if (display_social_inputs) {
         social_inputs = (
            <div>
               <InputGroup
                  placeholder="Twitter Profile URL"
                  name="twitter"
                  icon="fab fa-twitter"
                  value={this.state.twitter}
                  onChange={e => this.on_change(e)}
                  error={errors.twitter}
               />

               <InputGroup
                  placeholder="Facebook Page URL"
                  name="facebook"
                  icon="fab fa-facebook"
                  value={this.state.facebook}
                  onChange={e => this.on_change(e)}
                  error={errors.facebook}
               />

               <InputGroup
                  placeholder="Linkedin Profile URL"
                  name="linkedin"
                  icon="fab fa-linkedin"
                  value={this.state.linkedin}
                  onChange={e => this.on_change(e)}
                  error={errors.linkedin}
               />

               <InputGroup
                  placeholder="YouTube Channel URL"
                  name="youtube"
                  icon="fab fa-youtube"
                  value={this.state.youtube}
                  onChange={e => this.on_change(e)}
                  error={errors.youtube}
               />

               <InputGroup
                  placeholder="Instagram Page URL"
                  name="instagram"
                  icon="fab fa-instagram"
                  value={this.state.instagram}
                  onChange={e => this.on_change(e)}
                  error={errors.instagram}
               />
            </div>
         )
      }

      // Select options
      const options = [
         { label: '* Select Professional Status', value: 0 },
         { label: 'Developer', value: 'Developer' },
         { label: 'Junior Developer', value: 'Junior Developer' },
         { label: 'Senior Developer', value: 'Senior Developer' },
         { label: 'Manager', value: 'Manager' },
         { label: 'Student or Learning', value: 'Student or Learning' },
         { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
         { label: 'Intern', value: 'Intern' },
         { label: 'Other', value: 'Other' },
      ]

      return (
         <div className="create-profile">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <h1 className="display-4 text-center">
                        Create Your Profile
                     </h1>
                     <p className="lead text-center">
                        Let's get some information to make your profile stand
                        out.
                     </p>
                     <small className="d-block pb-3">* = required fields</small>
                     <form onSubmit={e => this.on_submit(e)}>
                        <TextFieldGroup
                           placeholder="* Profile handle"
                           name="handle"
                           value={this.state.handle}
                           onChange={e => this.on_change(e)}
                           error={errors.handle}
                           info="A unique handle for your profile URL"
                        />
                        <SelectListGroup
                           placeholder="Status"
                           name="status"
                           value={this.state.status}
                           onChange={e => this.on_change(e)}
                           options={options}
                           error={errors.status}
                           info="Give us an idea of where you are at in your career"
                        />
                        <TextFieldGroup
                           placeholder="Company"
                           name="company"
                           value={this.state.company}
                           onChange={e => this.on_change(e)}
                           error={errors.company}
                           info="Could be your own company or one you work for"
                        />
                        <TextFieldGroup
                           placeholder="Website"
                           name="website"
                           value={this.state.website}
                           onChange={e => this.on_change(e)}
                           error={errors.website}
                           info="Could be your own website or a company one"
                        />
                        <TextFieldGroup
                           placeholder="Location"
                           name="location"
                           value={this.state.location}
                           onChange={e => this.on_change(e)}
                           error={errors.location}
                           info="City or city & state suggested (eg. Boston, MA)"
                        />
                        <TextFieldGroup
                           placeholder="* Skills"
                           name="skills"
                           value={this.state.skills}
                           onChange={e => this.on_change(e)}
                           error={errors.skills}
                           info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                        />
                        <TextFieldGroup
                           placeholder="Github Username"
                           name="githubusername"
                           value={this.state.githubusername}
                           onChange={e => this.on_change(e)}
                           error={errors.githubusername}
                           info="If you want your latest repos and a Github link, include your username"
                        />
                        <TextAreaFieldGroup
                           placeholder="Short Bio"
                           name="bio"
                           value={this.state.bio}
                           onChange={e => this.on_change(e)}
                           error={errors.bio}
                           info="Tell us a little about yourself"
                        />

                        <div className="mb-3">
                           <button
                              className="btn btn-light"
                              onClick={e => {
                                 e.preventDefault()
                                 this.setState(prevState => ({
                                    display_social_inputs: !prevState.display_social_inputs,
                                 })) // using prevState in this way allows for simple toggles of state
                              }}
                           >
                              Add social network links
                           </button>
                           <span className="text-muted ml-4">Optional</span>
                        </div>
                        {social_inputs}
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

CreateProfile.propTypes = {
   profile: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired,
}

const map_state_to_props = state => ({
   profile: state.profile,
   errors: state.errors,
})

export default connect(map_state_to_props)(CreateProfile)
