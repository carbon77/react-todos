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
  size,
  ...attrs
}) => {
  const classes = classNames('btn', className, color, size, { fluid })

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
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger']),
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  size: PropTypes.oneOf(['', 'large', 'small']),
  onClick() {},
}

Button.defaultProps = {
  children: 'Button',
  className: '',
  color: 'secondary',
  disabled: false,
  fluid: false,
  size: '',
  onClick() {},
}

export default Button
