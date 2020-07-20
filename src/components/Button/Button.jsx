import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Button.sass'

const Button = ({
  children,
  className,
  color,
  disabled,
  onClick,
  fluid,
  ...attrs
}) => {
  const classes = classNames('btn', className, color, { fluid })

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...attrs}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(['secondary', 'success', 'danger']),
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  onClick() {},
}

Button.defaultProps = {
  children: 'Button',
  className: '',
  color: 'secondary',
  disabled: false,
  fluid: false,
  onClick() {},
}

export default Button
