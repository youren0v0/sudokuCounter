import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'

export function reducers(){
  console.log('store')
  return createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware // 允许我们 dispatch() 函数
      )
    )
  )
}
