import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Sidebar from './components/Sidebar/Sidebar'
import FolderPage from './components/FolderPage/FolderPage'
import { fetchFolders } from './store/folders.reducer'

function App() {
  const folders = useSelector((state) => state.folders.folders)
  const dispatch = useDispatch()
  const [foldersLoading, setFoldersLoading] = React.useState(false)

  React.useEffect(() => {
    setFoldersLoading(true)
    dispatch(fetchFolders()).then(() => {
      setFoldersLoading(false)
    })
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar folders={folders} loading={foldersLoading} />
        <div className="content">
          <Switch>
            <Route path={'/todos/:folderId?'}>
              <FolderPage folders={folders} />
            </Route>
            <Redirect to={'/todos'} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
