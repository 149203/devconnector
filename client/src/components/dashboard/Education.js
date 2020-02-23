import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { delete_education } from '../../actions/profileActions'

class Education extends Component {
   on_delete_click(e, id) {
      this.props.delete_education(id)
   }

   render() {
      const education = this.props.education.map(edu => (
         // render a table row for each education
         <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
               <Moment format="YYYY/MM/DD">{edu.from}</Moment>&nbsp;-&nbsp;
               {edu.to === null ? (
                  'Now'
               ) : (
                  <Moment format="YYYY/MM/DD">{edu.to}</Moment>
               )}
            </td>
            <td>
               <button
                  className="btn btn-danger"
                  onClick={e => this.on_delete_click(e, edu._id)}
               >
                  Delete
               </button>
            </td>
         </tr>
      ))
      return (
         <div>
            <h4 className="mb-4">Education</h4>
            <table className="table">
               <thead>
                  <tr>
                     <th>School</th>
                     <th>Degree</th>
                     <th>Years</th>
                     <th></th>
                  </tr>
               </thead>
               {education}
            </table>
         </div>
      )
   }
}

Education.propTypes = {
   delete_education: PropTypes.func.isRequired,
}

const map_state_to_props = state => null

export default connect(map_state_to_props, { delete_education })(Education)
