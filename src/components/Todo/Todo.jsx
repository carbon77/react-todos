import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import Input from '../Input/Input'
import Loader from '../Loader/Loader'
import Fade from '../Fade/Fade'
import { deleteTodo, updateTodo } from '../../store/todos/actions'
import Icon from '../Icon/Icon'

const Todo = ({ todo }) => {
  const [completed, setCompleted] = React.useState(todo.completed)
  const [showButtons, setShowButtons] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [editMode, setEditMode] = React.useState(false)
  const [todoText, setTodoText] = React.useState(todo.text)
  const dispatch = useDispatch()

  async function onDeleteClick() {
    setLoading(true)
    await dispatch(deleteTodo(todo.id))
  }

  async function toggleTodo() {
    await dispatch(updateTodo(todo.id, { ...todo, completed: !completed }))
    setCompleted(!completed)
  }

  async function updateTodoText() {
    if (!todoText) {
      setTodoText(todo.text)
    } else if (todoText !== todo.text) {
      await dispatch(updateTodo(todo.id, { ...todo, text: todoText }))
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
              <Icon
                icon={'edit'}
                title={'Change todo text'}
                onClick={() => setEditMode(true)}
              />
              <Icon
                icon={'close'}
                title={'Delete todo'}
                onClick={onDeleteClick}
              />
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
