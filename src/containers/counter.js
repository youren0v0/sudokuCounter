import React, { Component } from 'react';
import ArrTable from '../components/arrTable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {fetchArrNum, clearArr} from '../store/actions'

class Counter extends Component {
  confirm () {
    // 解答器
    let startTime = new Date().getTime()
    console.log(this.props.arr)
    let allArr = this.props.arr
    let valid = (col, row) => {
      // 九宫格判定
      let bigCol = Math.floor(col/3)*3  // 计算九宫格位置
      let bigRow = Math.floor(row/3)*3  // 计算九宫格位置
      let _i = col%3                    // 自己在九宫格内的坐标
      let _j = row%3                    // 自己在九宫格内的坐标
      let nineArr = []                  // 储存九宫格内的值
      for (let i = 0; i < 3; i++ ) {
        for (let j = 0; j < 3; j++) {
          if (i !== _i && j !== _j && allArr[bigCol + i][bigRow + j] !== 0) {// 排除自己与0
            nineArr.push(allArr[bigCol + i][bigRow + j]) // 为九宫格赋值
          }
        }
      }
      // 十字格判定
      let colArr = []                   // 储存整列的值
      let rowArr = []                   // 储存整排的值
      for (let i = 0; i < 9; i++) {
        if (col !== i && allArr[i][row] !== 0) {
          colArr.push(allArr[i][row])
        }
        if (row !== i && allArr[col][i] !== 0) {
          rowArr.push(allArr[col][i])
        }
      }
      let validArr = [
        nineArr,
        colArr,
        rowArr
      ]
      for (let arr of validArr) {
        if (arr.length !== 0 && arr.indexOf(allArr[col][row]) !== -1) {
          return false
        }
      }
      // console.log('返回了true')
      return true
    }

    // 循环遍历

    let tryNum = 0
    let stack = []
    let onOff = false                        // 判断是否是再次进入的开关
    for (let col = 0; col < 9;) {
      // console.log('进入col')
      for (let row = 0; row <9;) {
        tryNum++
        // console.log(tryNum)
        // if (tryNum > 5000) {
        //   console.log('暂停')
        //   console.log(stack, 'stack')
        //   console.log(allArr, 'allArr')
        //   return
        // }
        // console.log('进入row')
        if (allArr[col][row] === 0 || onOff) {
          onOff = false                        // 关上回溯开关,每次都要执行,是不是会浪费时间?
          for (let num = 1; num < 10;) {
            allArr[col][row] += 1             // 填入数字自加比较好,等于num不是很方便
            if (allArr[col][row] < 10 && valid(col, row)) {            // 判断是否是正确数值
              stack.push({col, row})          // 记录正确点位
              break                           // 得到了一个正确值
            }
            num = allArr[col][row] + 1        // num设置为最新值+1
            if (num >= 10) {                  // 没有正确值需要回溯
              allArr[col][row] = 0
              let obj = stack.pop()           // 抽取并删除最后一个点位
              if (stack.length === 0) {
                let overTime = new Date().getTime()
                let time = (overTime - startTime)/1000 + 's'
                console.log(time, 'time')
                console.log(tryNum, 'tryNum')
                console.log(stack, 'stack')
                console.log(allArr, 'allArr')
                alert('无解')
                return
              }
              col = obj.col                   // 重置col和row
              row = obj.row
              onOff = true                    // 打开回溯开关
              break
            }
          }
        } else {
          row++
        }
      }
      col++
    }
    let overTime = new Date().getTime()
    let time = (overTime - startTime)/1000 + 's'
    console.log(time, 'time')
    console.log(tryNum, 'tryNum')
    console.log(stack, 'stack')
    console.log(allArr, 'allArr')
  }
  clear () {
    this.props.clearArr()
  }
  render() {
    return (
      <div className="counter">
        <h4>counter</h4>
        <div className="col">012345678</div>
        <div>
          <div className="row">012345678</div>
          <ArrTable />
        </div>

        <button onClick={() => this.confirm()}>计算</button>
        <button onClick={() => this.clear()}>重置</button>
      </div>
    );
  }
}

// export default One;

export default connect(
  state => ({
    arr: state.arrTable.arr
  }),
  dispatch => bindActionCreators({
    fetchArrNum,
    clearArr
  }, dispatch)
)(Counter)
