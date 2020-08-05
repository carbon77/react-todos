import React from 'react'

import './Folder.sass'
import FolderHeader from './FolderHeader/FolderHeader'
import Todo from '../Todo/Todo'
import FolderForm from './FolderForm/FolderForm'
import Icon from '../Icon/Icon'

const Folder = (props) => {
  const [showForm, setShowForm] = React.useState(false)

  return (
    <div className={'folder'}>
      <FolderHeader folder={props.folder} />
      <hr />
      <div className="folder__todos">
        {props.todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}

        {showForm ? (
          <FolderForm
            folderId={props.folder.id}
            onClose={() => setShowForm(false)}
          />
        ) : (
          <div
            className="folder__todo text-muted"
            onClick={() => setShowForm(true)}
          >
            <Icon icon={'add'} />
            <div className="folder__todo-text">New task</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Folder
