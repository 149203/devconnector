// a list of all profiles

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' // allows connecting redux to this react component
import Spinner from '../common/Spinner'
import { get_profiles } from '../../actions/profileActions'
import ProfileItem from './ProfileItem'

class Profiles extends Component {
   componentDidMount() {
      this.props.get_profiles()
   }

   render() {
      const { profiles, loading } = this.props.profile
      let profile_items
      if (profiles === null || loading) {
         profile_items = <Spinner />
      } else if (profiles.length > 0) {
         profile_items = profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
         ))
      } else {
         profile_items = <h4>No profiles found.</h4>
      }

      return (
         <div className="profiles">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <h1 className="display-4 text-center">
                        Developer Profiles
                     </h1>
                     <p className="lead text-center">
                        Browse and connect with developers
                     </p>
                     {profile_items}
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

Profiles.propTypes = {
   get_profiles: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
}

const map_state_to_props = state => ({
   profile: state.profile,
})

export default connect(map_state_to_props, { get_profiles })(Profiles)
