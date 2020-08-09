import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './FolderPage.sass'
import Folder from '../Folder/Folder'
import Loader from '../Loader/Loader'
import { fetchTodos } from '../../store/todos/actions'

const FolderPage = (props) => {
  const [currentFolders, setCurrentFolders] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const todos = useSelector((state) => state.todos.todos)
  const { folderId } = useParams()
  const dispatch = useDispatch()

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

    dispatch(fetchTodos()).then(() => {
      setLoading(false)
    })
  }, [folderId, props.folders, dispatch])

  return (
    <div className={'folders'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!currentFolders.length ? (
            <div className="empty-text">
              <h1>No tasks</h1>
            </div>
          ) : (
            currentFolders.map((folder) => (
              <Folder
                key={folder.id}
                folder={folder}
                todos={todos.filter((todo) => todo.folderId === folder.id)}
              />
            ))
          )}
        </>
      )}
    </div>
  )
}

export default FolderPage
