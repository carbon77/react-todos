import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import Input from '../../Input/Input'
import Button from '../../Button/Button'
import todosAPI from '../../../api/todos.api'
import { addTodo } from '../../../store/todos.reducer'

const FolderForm = ({ folderId, onClose }) => {
  const [todoText, setTodoText] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch()

  async function createTodo(folderId, text) {
    await todosAPI.createTodo(folderId, text).then((todo) => {
      dispatch(addTodo(todo))
    })
  }

  async function onSubmit(event) {
    event.preventDefault()

    setLoading(true)
    await createTodo(folderId, todoText)
    setLoading(false)
    onClose()
  }

  return (
    <form className="folder__form" onSubmit={onSubmit}>
      <Input
        placeholder={'Enter folder name'}
        value={todoText}
        onChange={(event) => setTodoText(event.target.value)}
        autoFocus={true}
      />
      <div className="form__buttons">
        <Button
          disabled={!todoText || loading}
          type={'submit'}
          color={'success'}
          size={'small'}
        >
          Add task
        </Button>
        <Button color={'danger'} size={'small'} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

FolderForm.propTypes = {
  folderId: PropTypes.number.isRequired,
  onClose: PropTypes.func,
}

FolderForm.defaultProps = {
  onClose() {},
}

export default FolderForm
