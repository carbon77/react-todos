import React from 'react'

import './Folder.sass'
import FolderHeader from './FolderHeader/FolderHeader'
import Todo from '../Todo/Todo'
import FolderForm from './FolderForm/FolderForm'

const Folder = (props) => {
  const [showForm, setShowForm] = React.useState(false)

  return (
    <div className={'folder'}>
      <FolderHeader folder={props.folder} updateFolder={props.updateFolder} />
      <hr />
      <div className="folder__todos">
        {props.todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={props.deleteTodo}
            updateTodo={props.updateTodo}
          />
        ))}

        {showForm ? (
          <FolderForm
            folderId={props.folder.id}
            onClose={() => setShowForm(false)}
            createTodo={props.createTodo}
          />
        ) : (
          <div
            className="folder__todo text-muted"
            onClick={() => setShowForm(true)}
          >
            <span className="material-icons">add</span>
            <div className="folder__todo-text">New task</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Folder
