import React from 'react'
import PropTypes from 'prop-types'

import './Loader.sass'

const Loader = ({ inline, size, borderWidth }) => {
  return (
    <div
      className={'loader'}
      style={{ display: inline ? 'inline-flex' : 'flex' }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderWidth: `${borderWidth}px`,
        }}
      />
    </div>
  )
}

Loader.propTypes = {
  inline: PropTypes.bool,
  size: PropTypes.string,
  borderWidth: PropTypes.number,
}

Loader.defaultProps = {
  inline: false,
  size: '50px',
  borderWidth: 7,
}

export default Loader
