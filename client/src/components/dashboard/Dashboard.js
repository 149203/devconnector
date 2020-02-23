import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' // allows connecting redux to this react component
import {
   get_current_profile,
   delete_account,
} from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'
import ProfileActions from './ProfileActions'
import Experience from './Experience'
import Education from './Education'

class Dashboard extends Component {
   componentDidMount() {
      this.props.get_current_profile()
   }
   on_delete_click(e) {
      this.props.delete_account()
   }

   render() {
      const { user } = this.props.auth
      const { loading, profile } = this.props.profile

      let dashboard_content
      if (profile === null || loading === true) {
         dashboard_content = <Spinner />
      } else {
         if (Object.keys(profile).length > 0) {
            dashboard_content = (
               <div>
                  <p className="lead text-muted">
                     Welcome{' '}
                     <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                  </p>
                  <ProfileActions />
                  <Experience experience={profile.experience} />
                  <Education education={profile.education} />
                  <div style={{ marginTop: '60px' }}></div>
                  <button
                     className="btn btn-danger"
                     onClick={e => this.on_delete_click(e)}
                  >
                     Delete my account
                  </button>
               </div>
            )
         } else {
            // User is logged in, but has no profile
            dashboard_content = (
               <div>
                  <p className="lead text-muted">Welcome {user.name}</p>
                  <p>You have not yet created a profile.</p>
                  <Link to="/create-profile" className="btn btn-lg btn-info">
                     Create a profile
                  </Link>
               </div>
            )
         }
      }

      return (
         <div className="dashboard">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <h1 className="display-4">Dashboard</h1>
                     {dashboard_content}
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

Dashboard.propTypes = {
   get_current_profile: PropTypes.func.isRequired,
   delete_account: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
}

const map_state_to_props = state => ({
   profile: state.profile,
   auth: state.auth,
})

export default connect(map_state_to_props, {
   get_current_profile,
   delete_account,
})(Dashboard)
