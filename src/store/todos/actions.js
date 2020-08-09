import todosAPI from '../../api/todos.api'

// Action types
export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

// Action creators
export function setTodos(todos) {
  return {
    type: SET_TODOS,
    payload: { todos },
  }
}

export function addTodoActionCreator(todo) {
  return {
    type: ADD_TODO,
    payload: todo,
  }
}

export function deleteTodoActionCreator(id) {
  return {
    type: DELETE_TODO,
    payload: { id },
  }
}

export function updateTodoActionCreator(id, options) {
  return {
    type: UPDATE_TODO,
    payload: { id, options },
  }
}

// Thunks
export function fetchTodos() {
  return (dispatch) => {
    return todosAPI.fetchTodos().then((todos) => {
      dispatch(setTodos(todos))
    })
  }
}

export function addTodo(todo) {
  return (dispatch) => {
    return todosAPI.createTodo(todo.folderId, todo.text).then((newTodo) => {
      dispatch(addTodoActionCreator(newTodo))
    })
  }
}

export function deleteTodo(id) {
  return (dispatch) => {
    return todosAPI.deleteTodo(id).then(() => {
      dispatch(deleteTodoActionCreator(id))
    })
  }
}

export function updateTodo(id, options) {
  return (dispatch) => {
    return todosAPI.updateTodo(id, options).then(() => {
      dispatch(updateTodoActionCreator(id, options))
    })
  }
}
