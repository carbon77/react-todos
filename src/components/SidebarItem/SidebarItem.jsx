import React from 'react'
import PropType from 'prop-types'
import classNames from 'classnames'

import './SidebarItem.sass'

const SidebarItem = ({ text, className, info, onClick, actions, ...props }) => {
  const [showActions, setShowActions] = React.useState(false)
  const [actionsClasses, setActionsClasses] = React.useState('')
  const itemClasses = classNames('sidebar__item', className)
  let infoElem

  React.useEffect(() => {
    if (showActions) {
      setActionsClasses('')
    } else {
      setActionsClasses('hide')
    }
  }, [showActions])

  if (info.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)) {
    infoElem = (
      <div className={'sidebar__color'} style={{ backgroundColor: info }} />
    )
  } else {
    infoElem = <span className="material-icons">{info}</span>
  }

  return (
    <li
      className={itemClasses}
      onClick={onClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="sidebar__icon">{infoElem}</div>
      <div className="sidebar__text">{text}</div>
      {actions && (
        <div className={`sidebar__actions ${actionsClasses}`}>
          <div className="material-icons">edit</div>
          <div className="material-icons">close</div>
        </div>
      )}
    </li>
  )
}

SidebarItem.propTypes = {
  text: PropType.string.isRequired,
  className: PropType.string,
  info: PropType.string,
  actions: PropType.bool,
  onClick: PropType.func,
}

SidebarItem.defaultProps = {
  className: '',
  info: '#C9D1D3',
  actions: false,
  onClick() {},
}

export default SidebarItem
