import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import foldersReducer from './folders/reducer'
import todosReducer from './todos/reducer'

const reducers = combineReducers({
  folders: foldersReducer,
  todos: todosReducer,
})

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
