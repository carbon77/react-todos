import React from 'react'
import PropTypes from 'prop-types'

import './Sidebar.sass'
import SidebarFolderForm from '../SidebarFolderForm/SidebarFolderForm'

const Sidebar = ({ items }) => {
  const [isFormShowed, setIsFormShowed] = React.useState(false)

  return (
    <div className="sidebar">
      <ul className="sidebar__list">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.divider ? (
              <li className="sidebar__divider" />
            ) : (
              <li className="sidebar__item">
                <div className="sidebar__icon">
                  {item.icon ? (
                    <span className="material-icons">{item.icon}</span>
                  ) : (
                    <div
                      className="sidebar__color"
                      style={{ backgroundColor: item.color || '#C9D1D3' }}
                    />
                  )}
                </div>
                <div className="sidebar__text">{item.text}</div>
              </li>
            )}
          </React.Fragment>
        ))}
        {!items.length || <li className="sidebar__divider" />}
        <li
          className="sidebar__item text-muted"
          onClick={() => setIsFormShowed(true)}
        >
          <div className="sidebar__icon">
            <div className="material-icons">add</div>
          </div>
          <div className="sidebar__text">Add folder</div>
        </li>
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
