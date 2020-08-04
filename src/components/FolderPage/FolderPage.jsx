import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './FolderPage.sass'
import todosAPI from '../../api/todos.api'
import Folder from '../Folder/Folder'
import Loader from '../Loader/Loader'

const FolderPage = (props) => {
  const [currentFolders, setCurrentFolders] = React.useState([])
  const state = useSelector((state) => state.todos)
  const dispatch = useDispatch()
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

    todosAPI.fetchTodos(folderId).then((todos) => {
      dispatch({
        type: 'SET_TODOS',
        payload: { todos },
      })
      setLoading(false)
    })
  }, [folderId, props.folders, dispatch])

  async function deleteTodo(id, callback) {
    await todosAPI
      .deleteTodo(id)
      .then(callback)
      .then(() => {
        dispatch({
          type: 'DELETE_TODO',
          payload: { id },
        })
      })
  }

  async function createTodo(id, text) {
    await todosAPI.createTodo(id, text).then((todo) => {
      dispatch({
        type: 'ADD_TODO',
        payload: { ...todo },
      })
    })
  }

  async function updateTodo(id, options) {
    await todosAPI.updateTodo(id, options).then(() => {
      dispatch({
        type: 'UPDATE_TODO',
        payload: {
          id,
          options,
        },
      })
    })
  }

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
                todos={state.todos.filter(
                  (todo) => todo.folderId === folder.id
                )}
                updateFolder={props.updateFolder}
                deleteTodo={deleteTodo}
                createTodo={createTodo}
                updateTodo={updateTodo}
              />
            ))
          )}
        </>
      )}
    </div>
  )
}

export default FolderPage
