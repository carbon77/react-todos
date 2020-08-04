import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import Input from '../Input/Input'
import Loader from '../Loader/Loader'
import Fade from '../Fade/Fade'
import todosAPI from '../../api/todos.api'
import { deleteTodo, updateTodo } from '../../store/todos.reducer'

const Todo = ({ todo }) => {
  const [completed, setCompleted] = React.useState(todo.completed)
  const [showButtons, setShowButtons] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [editMode, setEditMode] = React.useState(false)
  const [todoText, setTodoText] = React.useState(todo.text)
  const dispatch = useDispatch()

  async function asyncDeleteTodo(id, callback) {
    await todosAPI
      .deleteTodo(id)
      .then(callback)
      .then(() => {
        dispatch(deleteTodo(id))
      })
  }

  async function asyncUpdateTodo(id, options) {
    await todosAPI.updateTodo(id, options).then(() => {
      dispatch(updateTodo(id, options))
    })
  }

  async function onDeleteClick() {
    setLoading(true)
    await asyncDeleteTodo(todo.id, () => setLoading(false))
  }

  async function toggleTodo() {
    await asyncUpdateTodo(todo.id, { ...todo, completed: !completed })
    setCompleted(!completed)
  }

  async function updateTodoText() {
    if (!todoText) {
      setTodoText(todo.text)
    } else if (todoText !== todo.text) {
      await asyncUpdateTodo(todo.id, { ...todo, text: todoText })
    }

    setEditMode(false)
  }

  function on(callback) {
    return (event) => {
      if (event.target.classList.contains('material-icons')) {
        return
      }

      callback()
    }
  }

  return (
    <div
      key={todo.id}
      className={'folder__todo'}
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      <Input type={'checkbox'} checked={completed} onChange={on(toggleTodo)} />
      <div
        className="folder__todo-text"
        onClick={on(() => setCompleted(!completed))}
      >
        {editMode ? (
          <Input
            value={todoText}
            autoFocus={true}
            onChange={(event) => setTodoText(event.target.value)}
            onBlur={updateTodoText}
            onKeyDown={({ key }) => (key === 'Enter' ? updateTodoText() : null)}
          />
        ) : (
          todo.text
        )}
      </div>
      <Fade in={showButtons} unmountOnExit duration={150}>
        <div className="folder__todo-buttons">
          {loading ? (
            <Loader inline size={'15px'} borderWidth={2} />
          ) : (
            <>
              <span
                className="material-icons"
                title={'Change todo text'}
                onClick={() => setEditMode(true)}
              >
                edit
              </span>
              <span
                className={'material-icons folder__close-todo'}
                title={'Delete todo'}
                onClick={onDeleteClick}
              >
                close
              </span>
            </>
          )}
        </div>
      </Fade>
    </div>
  )
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    folderId: PropTypes.number.isRequired,
  }).isRequired,
}

export default Todo
