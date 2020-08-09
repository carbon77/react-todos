import { ADD_TODO, DELETE_TODO, SET_TODOS, UPDATE_TODO } from './actions'

const defaultState = {
  todos: [],
}

function todosReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case SET_TODOS:
      return { ...state, todos: payload.todos }
    case ADD_TODO:
      const todo = {
        id: payload.id,
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
            return { ...todo, ...payload.options }
          }
          return todo
        }),
      }
    default:
      return state
  }
}

export default todosReducer
