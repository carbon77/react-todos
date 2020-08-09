import foldersAPI from '../../api/folders.api'

// Action types
export const SET_FOLDERS = 'SET_FOLDERS'
export const ADD_FOLDER = 'ADD_FOLDER'
export const DELETE_FOLDER = 'DELETE_FOLDER'
export const UPDATE_FOLDER = 'UPDATE_FOLDER'

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
