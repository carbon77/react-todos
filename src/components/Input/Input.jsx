import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Input.sass'
import { COLORS } from '../../assets/js/_colors'
import Icon from '../Icon/Icon'

const Input = ({ type, className, color, error, onChange, ...props }) => {
  const classes = classNames('form-control', className, {
    [color]: type !== 'checkbox' && COLORS.includes(color),
    error,
    'form-checkbox': type === 'checkbox',
  })
  const styles = {}

  if (color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)) {
    styles.backgroundColor = color
  }

  if (type === 'checkbox') {
    return (
      <>
        <label className={classes}>
          <input type="checkbox" checked={props.checked} onChange={onChange} />
          <Icon icon={'done'} />
          {!!props.title && props.title}
        </label>
        <div className="form-control__errors">{error}</div>
      </>
    )
  }

  return (
    <>
      <div className={classes}>
        <input type={type} onChange={onChange} {...props} />
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
  onChange: PropTypes.func,
}

Input.defaultProps = {
  type: 'text',
  className: '',
  color: 'primary',
  error: '',
  onChange() {},
}

export default Input
