/**
 * Created by zhuyue on 17/12/26.
 */
import {TABLE} from '../constants'

const initState = {}

export default function getTable(state = initState,action){
  switch(action.type){
    case TABLE:
      console.log('reducers')
      console.log(state)
      let num = {...state.num, ...action.num}
      for (let key in action.num) {
        if (!action.num[key]) {
          delete num[key]
        }
      }

      console.log(num)
      return {
        ...state,
        num
      }

    default:
      return state
  }
}