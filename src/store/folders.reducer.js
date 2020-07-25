const SET_FOLDERS = 'SET_FOLDERS'
const ADD_FOLDER = 'ADD_FOLDER'
const DELETE_FOLDER = 'DELETE_FOLDER'
const UPDATE_FOLDER = 'UPDATE_FOLDER'

function foldersReducer(state, { type, payload }) {
  switch (type) {
    case SET_FOLDERS:
      return { ...state, folders: payload.folders }
    case ADD_FOLDER:
      const folder = {
        id: payload.id,
        text: payload.text,
        color: payload.color,
      }
      return {
        ...state,
        folders: [...state.folders, folder],
      }
    case DELETE_FOLDER:
      return {
        ...state,
        folders: state.folders.filter((folder) => folder.id !== payload.id),
      }
    case UPDATE_FOLDER:
      return {
        ...state,
        folders: state.folders.map((folder) => {
          if (folder.id === payload.id) {
            return { ...folder, ...payload }
          }
          return folder
        }),
      }
    default:
      return state
  }
}

export default foldersReducer
