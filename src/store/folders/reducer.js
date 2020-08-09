import {
  ADD_FOLDER,
  DELETE_FOLDER,
  SET_FOLDERS,
  UPDATE_FOLDER,
} from './actions'

const defaultState = {
  folders: [],
}

function foldersReducer(state = defaultState, { type, payload }) {
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
            return { ...folder, ...payload.options }
          }
          return folder
        }),
      }
    default:
      return state
  }
}

export default foldersReducer
