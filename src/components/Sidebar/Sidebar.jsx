import React from 'react'
import PropTypes from 'prop-types'

import './Sidebar.sass'
import SidebarFolderForm from '../SidebarFolderForm/SidebarFolderForm'
import SidebarItem from '../SidebarItem/SidebarItem'

const Sidebar = ({ items }) => {
  const [isFormShowed, setIsFormShowed] = React.useState(false)

  return (
    <div className="sidebar">
      <ul className="sidebar__list">
        {!!items.length && (
          <React.Fragment>
            <SidebarItem
              to={'/todos'}
              text={'All todos'}
              info={'format_list_bulleted'}
            />
            <li className="sidebar__divider" />
          </React.Fragment>
        )}

        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.divider ? (
              <li className="sidebar__divider" />
            ) : (
              <SidebarItem
                text={item.text}
                info={item.icon || item.color}
                to={`/todos/${item.id}`}
                actions
              />
            )}
          </React.Fragment>
        ))}
        {!items.length || <li className="sidebar__divider" />}
        <SidebarItem
          info={'add'}
          className="text-muted"
          text={'Add folder'}
          onClick={() => setIsFormShowed(true)}
        />
        {isFormShowed && (
          <SidebarFolderForm onClose={() => setIsFormShowed(false)} />
        )}
      </ul>
    </div>
  )
}

Sidebar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string,
      color: PropTypes.string,
      divider: PropTypes.bool,
    })
  ),
}

Sidebar.defaultProps = {
  items: [],
}

export default Sidebar
