import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import Input from '../Input/Input'

const FolderHeader = ({ folder, updateFolder }) => {
  const [showEditButton, setShowEditButton] = React.useState(false)
  const [editMode, setEditMode] = React.useState(false)
  const [folderName, setFolderName] = React.useState(folder.text)

  async function onSubmit() {
    if (folder.text !== folderName) {
      await updateFolder(folder.id, { ...folder, text: folderName })
    }

    setEditMode(false)
  }

  if (editMode) {
    return (
      <Input
        color={folder.color}
        value={folderName}
        onChange={(event) => setFolderName(event.target.value)}
        onBlur={onSubmit}
        onKeyDown={({ key }) => (key === 'Enter' ? onSubmit() : null)}
        autoFocus={true}
      />
    )
  }

  return (
    <h1
      className="folder__header"
      style={{ color: folder.color }}
      onMouseEnter={() => setShowEditButton(true)}
      onMouseLeave={() => setShowEditButton(false)}
    >
      {folder.text}
      <CSSTransition
        in={showEditButton}
        unmountOnExit
        timeout={300}
        classNames={'folder__header'}
      >
        <div
          className="material-icons"
          title={'Edit folder name'}
          onClick={() => setEditMode(true)}
        >
          edit
        </div>
      </CSSTransition>
    </h1>
  )
}

FolderHeader.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
  }).isRequired,
  updateFolder: PropTypes.func,
}

FolderHeader.defaultProps = {
  updateFolder() {},
}

export default FolderHeader
