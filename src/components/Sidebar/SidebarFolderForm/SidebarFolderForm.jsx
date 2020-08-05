import React from 'react'
import { useDispatch } from 'react-redux'

import './SidebarFolderForm.sass'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import { addFolder } from '../../../store/folders.reducer'
import Icon from '../../Icon/Icon'

const colors = [
  '#c9c9c9',
  '#42B883',
  '#64C4ED',
  '#C355F5',
  '#FFBBCC',
  '#FF6464',
  '#09011A',
  '#B6E6BD',
]

const SidebarFolderForm = ({ onClose }) => {
  const [folderName, setFolderName] = React.useState('')
  const [selectedColor, setSelectedColor] = React.useState(colors[0])
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch()

  async function onSubmit(event) {
    event.preventDefault()
    setLoading(true)

    if (!folderName) {
      setError('This field is required!')
      setLoading(false)
      return
    }

    const folder = {
      text: folderName,
      color: selectedColor,
    }

    setError('')
    await dispatch(addFolder(folder))
    onClose()
  }

  return (
    <form className={'sidebar__form'} onSubmit={onSubmit}>
      <Input
        placeholder={'Folder name'}
        autoComplete={'off'}
        value={folderName}
        error={error}
        onChange={({ target }) => setFolderName(target.value)}
        autoFocus={true}
      />
      <div className="sidebar__form__colors">
        {colors.map((color, index) => (
          <label className={'sidebar__form__radio-color'} key={index}>
            <input
              type="radio"
              checked={color === selectedColor}
              onChange={({ target }) => setSelectedColor(target.value)}
              value={color}
            />
            <span style={{ backgroundColor: color }} />
          </label>
        ))}
      </div>
      <Button type={'submit'} color={'success'} disabled={loading} fluid>
        Add
      </Button>
      <Icon
        icon={'close'}
        className={'sidebar__form__close'}
        onClick={onClose}
      />
    </form>
  )
}

export default SidebarFolderForm
