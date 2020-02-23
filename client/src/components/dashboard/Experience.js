import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { delete_experience } from '../../actions/profileActions'

class Experience extends Component {
   on_delete_click(e, id) {
      this.props.delete_experience(id)
   }

   render() {
      const experience = this.props.experience.map(exp => (
         // render a table row for each experience
         <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
               <Moment format="YYYY/MM/DD">{exp.from}</Moment>&nbsp;-&nbsp;
               {exp.to === null ? (
                  'Now'
               ) : (
                  <Moment format="YYYY/MM/DD">{exp.to}</Moment>
               )}
            </td>
            <td>
               <button
                  className="btn btn-danger"
                  onClick={e => this.on_delete_click(e, exp._id)}
               >
                  Delete
               </button>
            </td>
         </tr>
      ))
      return (
         <div>
            <h4 className="mb-4">Experience</h4>
            <table className="table">
               <thead>
                  <tr>
                     <th>Company</th>
                     <th>Title</th>
                     <th>Years</th>
                     <th></th>
                  </tr>
               </thead>
               {experience}
            </table>
         </div>
      )
   }
}

Experience.propTypes = {
   delete_experience: PropTypes.func.isRequired,
}

const map_state_to_props = state => null

export default connect(map_state_to_props, { delete_experience })(Experience)
