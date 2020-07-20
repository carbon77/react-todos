import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Input.sass'
import { COLORS } from '../../assets/js/_colors'

const Input = ({ type, className, color, error, ...attrs }) => {
  const classes = classNames('form-control', className, {
    [color]: COLORS.includes(color),
    error,
  })
  const styles = {}

  if (color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)) {
    styles.backgroundColor = color
  }

  return (
    <>
      <div className={classes}>
        <input type={type} {...attrs} />
        <span style={styles} />
      </div>
      <div className="form-control__errors">{error}</div>
    </>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  error: PropTypes.string,
}

Input.defaultProps = {
  type: 'text',
  className: '',
  color: 'primary',
  error: '',
}

export default Input
