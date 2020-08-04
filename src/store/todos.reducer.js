// Action types
const SET_TODOS = 'SET_TODOS'
const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'
const UPDATE_TODO = 'UPDATE_TODO'

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

// Action creators
export function setTodos(todos) {
  return {
    type: SET_TODOS,
    payload: { todos },
  }
}

export function addTodo(todo) {
  return {
    type: ADD_TODO,
    payload: todo,
  }
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: { id },
  }
}

export function updateTodo(id, options) {
  return {
    type: UPDATE_TODO,
    payload: { id, options },
  }
}
