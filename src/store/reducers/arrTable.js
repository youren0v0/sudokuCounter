/**
 * Created by zhuyue on 17/12/26.
 */
import {ARR_NUM_OBJ} from '../constants'

const initState = {}

export default function getArr(state = initState,action){
  switch(action.type){
    case ARR_NUM_OBJ:
      let arrObj = action.arrNumObj
      let arr = state.arr
      console.log('reducers')
      action.arrNumObj
      if (arrObj.num === 'clear' || !arr) {
        arr = new Array(9)
        for (let i = 0; i<arr.length; i++) {
          let childArr = new Array(9)
          childArr.fill(0)
          arr[i] = childArr
        }
      }
      if (arrObj.col && arrObj.row) {
        arr[arrObj.col][arrObj.row] = arrObj.num
      }
      console.log(arr)
      return {
        ...state,
        arr
      }

    default:
      return state
  }
}