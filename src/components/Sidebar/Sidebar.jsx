import React from 'react'
import { CSSTransition } from 'react-transition-group'

import './Sidebar.sass'
import SidebarFolderForm from '../SidebarFolderForm/SidebarFolderForm'
import SidebarItem from '../SidebarItem/SidebarItem'
import foldersReducer from '../../store/folders.reducer'
import foldersAPI from '../../api/folders.api'
import Loader from '../Loader/Loader'

const Sidebar = (props) => {
  const [state, dispatch] = React.useReducer(foldersReducer, { folders: [] })
  const [isFormShowed, setIsFormShowed] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    foldersAPI.fetchFolders().then((data) => {
      dispatch({
        type: 'SET_FOLDERS',
        payload: {
          folders: data,
        },
      })
      setLoading(false)
    })
  }, [])

  async function addFolder(text, color) {
    const folder = await foldersAPI.createFolder(text, color)
    dispatch({
      type: 'ADD_FOLDER',
      payload: folder,
    })
  }

  async function deleteFolder(id, callback) {
    await foldersAPI
      .deleteFolder(id)
      .then(callback)
      .then(() => {
        dispatch({
          type: 'DELETE_FOLDER',
          payload: { id },
        })
      })
  }

  return (
    <div className="sidebar">
      {loading ? (
        <Loader />
      ) : (
        <ul className="sidebar__list">
          {!!state.folders.length && (
            <>
              <SidebarItem
                to={'/todos'}
                text={'All todos'}
                info={'format_list_bulleted'}
              />
              <li className="sidebar__divider" />
            </>
          )}

          {state.folders.map((folder) => (
            <SidebarItem
              key={folder.id}
              text={folder.text}
              info={folder.icon || folder.color}
              to={`/todos/${folder.id}`}
              deleteFolder={deleteFolder}
              folderId={folder.id}
              actions
            />
          ))}

          {!state.folders.length || <li className="sidebar__divider" />}
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
            <SidebarFolderForm
              addFolder={addFolder}
              onClose={() => setIsFormShowed(false)}
            />
          </CSSTransition>
        </ul>
      )}
    </div>
  )
}

export default Sidebar
