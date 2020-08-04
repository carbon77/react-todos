import { combineReducers, createStore } from 'redux'

import foldersReducer from './folders.reducer'
import todosReducer from './todos.reducer'

const reducers = combineReducers({
  folders: foldersReducer,
  todos: todosReducer,
})

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
