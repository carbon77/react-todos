import React from 'react'
import { useParams } from 'react-router-dom'

import './FolderPage.sass'
import todosReducer from '../../store/todos.reducer'
import foldersAPI from '../../api/todos.api'
import Folder from '../Folder/Folder'
import Loader from '../Loader/Loader'

const FolderPage = (props) => {
  const [currentFolders, setCurrentFolders] = React.useState([])
  const [state, dispatch] = React.useReducer(todosReducer, { todos: [] })
  const [loading, setLoading] = React.useState(false)
  const { folderId } = useParams()

  React.useEffect(() => {
    setLoading(true)

    // Determine which folders to fetch
    if (folderId) {
      setCurrentFolders(
        props.folders.filter((folder) => folder.id === +folderId)
      )
    } else {
      setCurrentFolders(props.folders)
    }

    foldersAPI.fetchTodos(folderId).then((todos) => {
      dispatch({
        type: 'SET_TODOS',
        payload: { todos },
      })
      setLoading(false)
    })
  }, [folderId, props.folders])

  return (
    <div className={'folders'}>
      {loading ? (
        <Loader />
      ) : (
        currentFolders.map((folder) => (
          <Folder
            key={folder.id}
            folder={folder}
            todos={state.todos.filter((todo) => todo.folderId === folder.id)}
            updateFolder={props.updateFolder}
          />
        ))
      )}
    </div>
  )
}

export default FolderPage
