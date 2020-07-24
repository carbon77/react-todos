const SET_TODOS = 'SET_TODOS'
const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'
const UPDATE_TODO = 'UPDATE_TODO'

function todosReducer(state, { type, payload }) {
  switch (type) {
    case SET_TODOS:
      return { ...state, todos: payload.todos }
    case ADD_TODO:
      const todo = {
        text: payload.text,
        folderId: payload.folderId,
        completed: payload.completed,
      }
      return {
        ...state,
        todos: [...state.todos, todo],
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload.id),
      }
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === payload.id) {
            return { ...todo, ...payload }
          }
          return todo
        }),
      }
    default:
      return state
  }
}

export default todosReducer
