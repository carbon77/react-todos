import React from 'react'
import PropType from 'prop-types'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './SidebarItem.sass'
import Loader from '../../Loader/Loader'
import Fade from '../../Fade/Fade'
import { deleteFolder } from '../../../store/folders.reducer'
import Icon from '../../Icon/Icon'

const SidebarItem = ({
  text,
  className,
  info,
  onClick,
  actions,
  to,
  active,
  ...props
}) => {
  const [showActions, setShowActions] = React.useState(false)
  const [deleteLoading, setDeleteLoading] = React.useState(false)
  const itemClasses = classNames('sidebar__item', className, { active })
  const history = useHistory()
  const dispatch = useDispatch()
  let infoElem

  if (info.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)) {
    infoElem = (
      <div className={'sidebar__color'} style={{ backgroundColor: info }} />
    )
  } else {
    infoElem = <Icon icon={info} />
  }

  function onItemClick(event) {
    const { target } = event

    if (target.classList.contains('sidebar__action')) {
      return
    }

    onClick()

    if (to) {
      history.push(to)
    }
  }

  async function onDelete() {
    setDeleteLoading(true)
    await dispatch(deleteFolder(props.folderId))
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
        <Fade in={showActions} duration={150} unmountOnExit>
          <div className={`sidebar__actions text-muted`}>
            {deleteLoading ? (
              <Loader inline size={'15px'} borderWidth={2} />
            ) : (
              <Icon
                icon={'delete'}
                className={'sidebar__action'}
                onClick={onDelete}
              />
            )}
          </div>
        </Fade>
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
  active: PropType.bool,
  onClick: PropType.func,
}

SidebarItem.defaultProps = {
  className: '',
  info: '#C9D1D3',
  actions: false,
  to: null,
  active: false,
  onClick() {},
}

export default SidebarItem
