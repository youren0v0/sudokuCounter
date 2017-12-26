/**
 * Created by zhuyue on 17/12/26.
 */
import {TABLE} from '../constants'

const initState = {}

export default function getTable(state = initState,action){
  switch(action.type){
    case TABLE:
      console.log('reducers')
      return {
        ...state,
        num: action.num
      }

    default:
      return state
  }
}