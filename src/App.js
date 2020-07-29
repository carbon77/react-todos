import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import Sidebar from './components/Sidebar/Sidebar'
import foldersReducer from './store/folders.reducer'
import foldersAPI from './api/folders.api'
import FolderPage from './components/FolderPage/FolderPage'

function App() {
  const [state, dispatch] = React.useReducer(foldersReducer, { folders: [] })
  const [foldersLoading, setFoldersLoading] = React.useState(false)

  React.useEffect(() => {
    setFoldersLoading(true)
    foldersAPI.fetchFolders().then((data) => {
      dispatch({
        type: 'SET_FOLDERS',
        payload: {
          folders: data,
        },
      })
      setFoldersLoading(false)
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

  async function updateFolder(id, options) {
    await foldersAPI.updateFolder(id, options).then(() => {
      dispatch({
        type: 'UPDATE_FOLDER',
        payload: {
          id,
          options,
        },
      })
    })
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar
          folders={state.folders}
          loading={foldersLoading}
          addFolder={addFolder}
          deleteFolder={deleteFolder}
        />
        <div className="content">
          <Switch>
            <Route path={'/todos/:folderId?'}>
              <FolderPage folders={state.folders} updateFolder={updateFolder} />
            </Route>
            <Redirect to={'/todos'} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
