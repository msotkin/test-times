import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'

import app from './app'

const middleware = [
  thunk,
  promise()
]

const reducers = combineReducers({
  app
})

export default (initialState = {}) => createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
