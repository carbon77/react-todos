import React from 'react'
import PropType from 'prop-types'
import classNames from 'classnames'

import './SidebarItem.sass'
import { useHistory } from 'react-router-dom'

const SidebarItem = ({
  text,
  className,
  info,
  onClick,
  actions,
  to,
  ...props
}) => {
  const [showActions, setShowActions] = React.useState(false)
  const [actionsClasses, setActionsClasses] = React.useState('')
  const history = useHistory()
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

  function onItemClick() {
    onClick()

    if (to) {
      history.push(to)
    }
  }

  return (
    <li
      className={itemClasses}
      onClick={onItemClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="sidebar__icon">{infoElem}</div>
      <div className="sidebar__text">{text}</div>
      {actions && (
        <div className={`sidebar__actions ${actionsClasses}`}>
          <div className="material-icons">edit</div>
          <div className="material-icons">delete</div>
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
  to: PropType.string,
  onClick: PropType.func,
}

SidebarItem.defaultProps = {
  className: '',
  info: '#C9D1D3',
  actions: false,
  to: null,
  onClick() {},
}

export default SidebarItem
