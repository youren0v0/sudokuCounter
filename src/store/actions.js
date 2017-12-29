import * as action from './constants'

export function getTabelNum(num = {}){
  console.log(num, 'action')
  return {
    type:action.TABLE,
    num
  }
}
export function fetchArrNum(num = 0, col, row){
  console.log(num, 'action')
  let arrNumObj = {
    num,
    col,
    row
  }
  return {
    type:action.ARR_NUM_OBJ,
    arrNumObj
  }
}
export function setAllArr(arr = []){
  console.log(arr, 'action')
  if (arr.length === 0) {
    clearArr()
    return function (dispatch) {
      dispatch(clearArr())
    }
  }
  return {
    type:action.ALL_ARR,
    arr
  }
}
export function clearArr(){
  console.log('action clearArr')
  return {
    type:action.ARR_CLEAR
  }
}