import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reducer } from './reducer'

// REDUX EXTENTION SETTING
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
