import React from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'

import './SidebarFolderForm.sass'

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

const SidebarFolderForm = ({ onClose, addFolder }) => {
  const [folderName, setFolderName] = React.useState('')
  const [selectedColor, setSelectedColor] = React.useState(colors[0])
  const [error, setError] = React.useState('')
  const [classes, setClasses] = React.useState(['sidebar-form', 'close'])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setClasses(['sidebar-form'])
  }, [])

  function closeForm() {
    setClasses(['sidebar-form', 'close'])
    setTimeout(onClose, 300)
  }

  async function onSubmit(event) {
    event.preventDefault()
    setLoading(true)

    if (!folderName) {
      setError('This field is required!')
      setLoading(false)
      return
    }

    setError('')
    await addFolder(folderName, selectedColor)
    closeForm()
  }

  return (
    <form className={classes.join(' ')} onSubmit={onSubmit}>
      <Input
        placeholder={'Folder name'}
        autoComplete={'off'}
        value={folderName}
        error={error}
        onChange={({ target }) => setFolderName(target.value)}
      />
      <div className="sidebar-form__colors">
        {colors.map((color, index) => (
          <label className={'sidebar-form__radio-color'} key={index}>
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
      <span className="sidebar-form__close material-icons" onClick={closeForm}>
        close
      </span>
    </form>
  )
}

export default SidebarFolderForm
