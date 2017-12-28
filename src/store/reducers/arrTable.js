/**
 * Created by zhuyue on 17/12/26.
 */
import {ARR_NUM_OBJ, ARR_CLEAR} from '../constants'

const initState = {}

export default function getArr(state = initState,action){
  switch(action.type){
    case ARR_NUM_OBJ:
      let arrObj = action.arrNumObj
      let arr = state.arr
      arr[arrObj.col][arrObj.row] = arrObj.num
      console.log(arr)
      return {
        ...state,
        arr: [...arr]
      }
    case ARR_CLEAR:
      let newArr = new Array(9)
      for (let i = 0; i<newArr.length; i++) {
        let childArr = new Array(9)
        childArr.fill(0)
        newArr[i] = childArr
      }
      console.log(arr)
      return {
        ...state,
        arr: newArr
      }
    default:
      return state
  }
}