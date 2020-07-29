import React from 'react'

import './Folder.sass'
import Input from '../Input/Input'
import FolderHeader from '../FolderHeader/FolderHeader'

const Folder = (props) => {
  return (
    <div className={'folder'}>
      <FolderHeader folder={props.folder} updateFolder={props.updateFolder} />
      <hr />
      <div className="folder__todos">
        {props.todos.map((todo) => (
          <div key={todo.id} className={'folder__todo'}>
            <Input type={'checkbox'} />
            <div className="folder__todo-text">{todo.text}</div>
          </div>
        ))}

        <div className="folder__todo text-muted">
          <span className="material-icons">add</span>
          <div className="folder__todo-text">New task</div>
        </div>
      </div>
    </div>
  )
}

export default Folder
