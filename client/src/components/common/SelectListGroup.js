import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
   const select_options = options.map(option => (
      <option key={option.label} value={option.value}>
         {option.label}
      </option>
   ))

   return (
      <div className="form-group">
         <select
            // classnames param 1 = default classNames
            // classnames param 2 = className IF property is true
            className={classnames('form-control form-control-lg', {
               'is-invalid': error,
            })}
            name={name}
            value={value}
            onChange={onChange}
         >
            {select_options}
         </select>
         {info && <small className="form-text text-muted">{info}</small>}
         {error && (
            <div className="invalid-feedback">
               {
                  error // if errors.email
               }
            </div>
         )}
      </div>
   )
}

SelectListGroup.propTypes = {
   name: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,
   info: PropTypes.string,
   error: PropTypes.string,
   onChange: PropTypes.func.isRequired,
   options: PropTypes.array.isRequired,
}

export default SelectListGroup
