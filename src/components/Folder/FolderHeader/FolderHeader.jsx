import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import Input from '../../Input/Input'
import Fade from '../../Fade/Fade'
import foldersAPI from '../../../api/folders.api'
import { updateFolder } from '../../../store/folders.reducer'

const FolderHeader = ({ folder }) => {
  const [showEditButton, setShowEditButton] = React.useState(false)
  const [editMode, setEditMode] = React.useState(false)
  const [folderName, setFolderName] = React.useState(folder.text)
  const dispatch = useDispatch()

  async function asyncUpdateFolder(id, options) {
    await foldersAPI.updateFolder(id, options).then(() => {
      dispatch(updateFolder(id, options))
    })
  }

  async function onSubmit() {
    if (!folderName) {
      setFolderName(folder.text)
    } else if (folder.text !== folderName) {
      await asyncUpdateFolder(folder.id, { ...folder, text: folderName })
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
      <Fade in={showEditButton} unmountOnExit duration={150}>
        <div
          className="material-icons"
          title={'Edit folder name'}
          onClick={() => setEditMode(true)}
        >
          edit
        </div>
      </Fade>
    </h1>
  )
}

FolderHeader.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
  }).isRequired,
}

export default FolderHeader
