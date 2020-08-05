import React from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import './Sidebar.sass'
import SidebarFolderForm from './SidebarFolderForm/SidebarFolderForm'
import SidebarItem from './SidebarItem/SidebarItem'
import Loader from '../Loader/Loader'

const Sidebar = (props) => {
  const [isFormShowed, setIsFormShowed] = React.useState(false)
  const location = useLocation()

  return (
    <div className="sidebar">
      {props.loading ? (
        <Loader />
      ) : (
        <ul className="sidebar__list">
          {!!props.folders.length && (
            <>
              <SidebarItem
                to={'/todos'}
                text={'All todos'}
                info={'format_list_bulleted'}
                active={'/todos' === location.pathname}
              />
              <li className="sidebar__divider" />
            </>
          )}

          {props.folders.map((folder) => (
            <SidebarItem
              key={folder.id}
              text={folder.text}
              info={folder.icon || folder.color}
              to={`/todos/${folder.id}`}
              folderId={folder.id}
              actions
              active={`/todos/${folder.id}` === location.pathname}
            />
          ))}

          {!props.folders.length || <li className="sidebar__divider" />}
          <SidebarItem
            info={'add'}
            className="text-muted"
            text={'Add folder'}
            onClick={() => setIsFormShowed(true)}
          />
          <CSSTransition
            in={isFormShowed}
            timeout={300}
            unmountOnExit
            classNames={'sidebar__form'}
          >
            <SidebarFolderForm onClose={() => setIsFormShowed(false)} />
          </CSSTransition>
        </ul>
      )}
    </div>
  )
}

export default Sidebar
