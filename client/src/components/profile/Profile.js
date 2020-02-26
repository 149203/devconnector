import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { Link } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileCreds from './ProfileCreds'
import ProfileGithub from './ProfileGithub'
import Spinner from '../common/Spinner'
import { get_profile_by_handle } from '../../actions/profileActions'

class Profile extends Component {
   componentDidMount() {
      const { handle } = this.props.match.params
      // this.props.match.params is part of react router 4
      // https://tylermcginnis.com/react-router-url-parameters/
      // here, we're pulling out the property we defined in App.js called handle

      if (handle) {
         this.props.get_profile_by_handle(handle)
      }
   }

   render() {
      return (
         <div>
            <ProfileHeader />
            <ProfileAbout />
            <ProfileCreds />
            <ProfileGithub />
         </div>
      )
   }
}

Profile.propTypes = {
   profile: PropTypes.object.isRequired,
   get_profile_by_handle: PropTypes.func.isRequired,
}

const map_state_to_props = state => ({
   profile: state.profile,
})

export default connect(map_state_to_props, { get_profile_by_handle })(Profile)
