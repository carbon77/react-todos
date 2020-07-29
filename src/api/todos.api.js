import API from './index'

export default {
  fetchTodos(folderId = null) {
    if (!folderId) {
      return API.get('/todos').then((response) => response.json())
    }

    return API.get(`/todos?folderId=${folderId}`).then((response) =>
      response.json()
    )
  },

  getTodos(id) {
    return API.get(`/todos/${id}`).then((response) => response.json())
  },

  createTodo(folderId, text) {
    const todo = {
      folderId,
      text,
      completed: false,
    }

    return API.post('/todos', todo).then((response) => response.json())
  },

  updateTodo(id, options) {
    return API.put(`/todos/${id}`, options).then((response) => response.json())
  },

  deleteTodo(id) {
    return API.delete(`/todos/${id}`).then((response) => response.json())
  },
}
