import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const styles = {
  userSelect: 'none',
}

const Icon = ({ icon, className, ...props }) => {
  const classes = classNames('material-icons', className)

  return (
    <span className={classes} style={styles} {...props}>
      {icon}
    </span>
  )
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Icon.defaultProps = {
  className: '',
}

export default Icon
