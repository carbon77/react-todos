import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input/Input'
import { CSSTransition } from 'react-transition-group'
import Loader from '../Loader/Loader'

const Todo = ({ todo, deleteTodo }) => {
  const [completed, setCompleted] = React.useState(todo.completed)
  const [showButtons, setShowButtons] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  async function onDeleteClick() {
    setLoading(true)
    await deleteTodo(todo.id, () => setLoading(false))
  }

  function on(callback) {
    return (event) => {
      const { target } = event

      if (target.classList.contains('material-icons')) {
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
      <Input
        type={'checkbox'}
        checked={completed}
        onChange={on(() => setCompleted(!completed))}
      />
      <div
        className="folder__todo-text"
        onClick={on(() => setCompleted(!completed))}
      >
        {todo.text}
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
              <span
                className={'material-icons folder__close-todo'}
                title={'Delete todo'}
                onClick={onDeleteClick}
              >
                close
              </span>
            )}
          </div>
        </CSSTransition>
      </div>
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
