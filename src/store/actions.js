import * as action from './constants'

export function getTabelNum(num = {}){
  console.log(num, 'action num')
  return {
    type:action.TABLE,
    num
  }
}