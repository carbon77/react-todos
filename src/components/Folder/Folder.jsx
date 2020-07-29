import React from 'react'

import './Folder.sass'
import FolderHeader from '../FolderHeader/FolderHeader'
import Todo from '../Todo/Todo'

const Folder = (props) => {
  return (
    <div className={'folder'}>
      <FolderHeader folder={props.folder} updateFolder={props.updateFolder} />
      <hr />
      <div className="folder__todos">
        {props.todos.map((todo) => (
          <Todo key={todo.id} todo={todo} deleteTodo={props.deleteTodo} />
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
