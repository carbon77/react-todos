import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input/Input'
import { CSSTransition } from 'react-transition-group'
import Loader from '../Loader/Loader'

const Todo = ({ todo, deleteTodo, updateTodo }) => {
  const [completed, setCompleted] = React.useState(todo.completed)
  const [showButtons, setShowButtons] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [toggleLoading, setToggleLoading] = React.useState(false)
  const [editMode, setEditMode] = React.useState(false)
  const [todoText, setTodoText] = React.useState(todo.text)

  async function onDeleteClick() {
    setLoading(true)
    await deleteTodo(todo.id, () => setLoading(false))
  }

  async function toggleTodo() {
    setToggleLoading(true)
    await updateTodo(todo.id, { ...todo, completed: !completed })
    setCompleted(!completed)
    setToggleLoading(false)
  }

  async function updateTodoText() {
    if (!todoText) {
      setTodoText(todo.text)
    } else if (todoText !== todo.text) {
      await updateTodo(todo.id, { ...todo, text: todoText })
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
      {toggleLoading ? (
        <Loader size={'28px'} />
      ) : (
        <Input
          type={'checkbox'}
          checked={completed}
          onChange={on(toggleTodo)}
        />
      )}
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
      <CSSTransition
        in={showButtons}
        unmountOnExit
        timeout={300}
        classNames={'folder__todo-buttons'}
      >
        <div className="folder__todo-buttons">
          {loading ? (
            <Loader inline size={'15px'} borderWidth={2} />
          ) : (
            <>
              <span
                className="material-icons"
                title={"Change todo text"}
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
      </CSSTransition>
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
  deleteTodo: PropTypes.func,
}

Todo.defaultProps = {
  deleteTodo() {},
}

export default Todo
