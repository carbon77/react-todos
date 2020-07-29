import React from 'react'
import PropTypes from 'prop-types'

import Input from '../Input/Input'
import Button from '../Button/Button'

const FolderForm = ({ folderId, createTodo, onClose }) => {
  const [todoText, setTodoText] = React.useState('')
  const [loading, setLoading] = React.useState(false)

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
  createFolder: PropTypes.func,
}

FolderForm.defaultProps = {
  onClose() {},
  createFolder() {},
}

export default FolderForm
