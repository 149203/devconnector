import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' // allows connecting redux to this react component
import { get_current_profile } from '../../actions/profileActions'

class Dashboard extends Component {
   componentDidMount() {
      this.props.get_current_profile()
   }

   render() {
      return <div></div>
   }
}

Dashboard.propTypes = {}

const map_state_to_props = state => ({})

export default connect(map_state_to_props, { get_current_profile })(Dashboard)
