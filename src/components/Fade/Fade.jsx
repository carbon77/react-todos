import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

import './Fade.sass'

const Fade = ({ children, in: inProp, duration, unmountOnExit, ...props }) => {
  return (
    <CSSTransition
      in={inProp}
      timeout={duration}
      unmountOnExit={unmountOnExit}
      classNames={'fade'}
      {...props}
    >
      <div style={{ display: 'inline' }}>{children}</div>
    </CSSTransition>
  )
}

Fade.propTypes = {
  children: PropTypes.node.isRequired,
  in: PropTypes.any.isRequired,
  duration: PropTypes.number.isRequired,
  unmountOnExit: PropTypes.bool,
}

Fade.defaultTypes = {
  unmountOnExit: false,
}

export default Fade
