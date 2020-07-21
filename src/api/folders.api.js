import API from './index'

export default {
  fetchFolders() {
    return API.get('/folders').then((response) => response.json())
  },

  getFolder(id) {
    return API.get(`/folders/${id}`).then((response) => response.json())
  },

  createFolder(text, color) {
    return API.post('/folders', {
      text,
      color,
    }).then((response) => response.json())
  },

  updateFolder(id, options) {
    return API.put(`/folders/${id}`, options).then((response) =>
      response.json()
    )
  },

  deleteFolder(id) {
    return API.delete(`/folders/${id}`).then((response) => response.json())
  },
}
