import foldersAPI from '../api/folders.api'

// Action types
const SET_FOLDERS = 'SET_FOLDERS'
const ADD_FOLDER = 'ADD_FOLDER'
const DELETE_FOLDER = 'DELETE_FOLDER'
const UPDATE_FOLDER = 'UPDATE_FOLDER'
const SET_CURRENT_FOLDER = 'SET_CURRENT_FOLDER'

const defaultState = {
  folders: [],
}

function foldersReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case SET_FOLDERS:
      return { ...state, folders: payload.folders }
    case SET_CURRENT_FOLDER:
      return { ...state, currentFolder: payload.id }
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

// Action creators
export function setFolders(folders) {
  return {
    type: SET_FOLDERS,
    payload: { folders },
  }
}

export function addFolderActionCreator(folder) {
  return {
    type: ADD_FOLDER,
    payload: folder,
  }
}

export function deleteFolderActionCreator(id) {
  return {
    type: DELETE_FOLDER,
    payload: { id },
  }
}

export function updateFolderActionCreator(id, options) {
  return {
    type: UPDATE_FOLDER,
    payload: { id, options },
  }
}

// Thunks
export function fetchFolders() {
  return (dispatch) => {
    return foldersAPI.fetchFolders().then((folders) => {
      dispatch(setFolders(folders))
    })
  }
}

export function addFolder(folder) {
  return (dispatch) => {
    return foldersAPI.createFolder(folder.text, folder.color).then((folder) => {
      dispatch(addFolderActionCreator(folder))
    })
  }
}

export function deleteFolder(id) {
  return (dispatch) => {
    return foldersAPI.deleteFolder(id).then(() => {
      dispatch(deleteFolderActionCreator(id))
    })
  }
}

export function updateFolder(id, options) {
  return (dispatch) => {
    foldersAPI.updateFolder(id, options).then(() => {
      dispatch(updateFolderActionCreator(id, options))
    })
  }
}
