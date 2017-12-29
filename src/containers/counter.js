import React, { Component } from 'react';
import ArrTable from '../components/arrTable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {fetchArrNum, clearArr} from '../store/actions'

class Counter extends Component {
  confirm () {
    // 解答器
    console.log(this.props.arr)
    let allArr = this.props.arr
    let valid = (col, row) => {
      // 九宫格判定
      let bigCol = Math.floor(col/3)*3  // 计算九宫格位置
      let bigRow = Math.floor(row/3)*3  // 计算九宫格位置
      let nineArr = []                  // 储存九宫格内的值
      for (let i = 0; i < 3; i++ ) {
        for (let j = 0; j < 3; j++) {
          if (i !== col%3 && j !== row%3) {
            nineArr.push(allArr[bigCol + i][bigRow + j]) // 为九宫格赋值
          }
        }
      }
      // 十字格判定
      let colArr = []                   // 储存整列的值
      let rowArr = []                   // 储存整排的值
      for (let i = 0; i < 9; i++) {
        if (col !== i) {
          colArr.push(allArr[i][row])
        }
        if (row !== i) {
          rowArr.push(allArr[col][i])
        }
      }

      let validArr = [
        nineArr,
        colArr,
        rowArr
      ]
      for (let arr of validArr) {
        if (arr.indexOf(allArr[col][row]) !== -1) {
          return false
        }
      }
      console.log('返回了true')
      return true
    }

    // 循环遍历
    let stack = []
    let onOff = false // 判断是否是再次进入的开关
    for (let col = 0; col < 9;) {
      console.log('进入col')
      for (let row = 0; row <9;) {
        // 如果是返回的值,进入新的逻辑,怎么区分第一次赋值与返回重新赋值?
        if (stack.length > 81) {
          console.log('暂停')
          console.log(stack, 'allArr')
          console.log(allArr, 'allArr')
          return
        }
        console.log('进入row')
        if (onOff) {
          console.log('进入了回溯点')
          onOff = false
          if (allArr[col][row] === 9) {
            // 需要继续回溯
            allArr[col][row] = 0
            // 重置col和row
            console.log('回溯点等于9,再次回溯')
            console.log(JSON.stringify(stack), 'stack')
            let obj = stack.pop()
            console.log(JSON.stringify(stack), 'stack')
            col = obj.col
            row = obj.row
            onOff = true
          } else {
            for (let num = allArr[col][row] + 1; num < 10;) {
              allArr[col][row] = num
              if (valid(col, row)) {
                stack.push({
                  col,
                  row
                })
                console.log(num, '得到了一个正确值, 回溯点内')
                console.log(onOff, 'onOff')
                console.log(JSON.stringify(stack), 'stack')
                break
              }
              num ++
              console.log(num, 'over')
              if (num === 10) {
                allArr[col][row] = 0
                // 重置col和row
                console.log('没有正确值需要回溯, 回溯点内')
                console.log(JSON.stringify(stack), 'stack')
                let obj = stack.pop()
                console.log(JSON.stringify(stack), 'stack')
                col = obj.col
                row = obj.row
                onOff = true
                break
              }
            }
          }
        } else if (allArr[col][row] === 0) {
          for (let num = 1; num < 10;) {
            allArr[col][row] = num
            if (valid(col, row)) {
              stack.push({
                col,
                row
              })
              console.log(num, '得到了一个正确值')
              console.log(JSON.stringify(stack), 'stack')
              break
            }
            num ++
            console.log(num, 'over')
            if (num === 10) {
              allArr[col][row] = 0
              // 重置col和row
              console.log(JSON.stringify(stack), 'stack1')
              let obj = stack.pop()
              console.log(JSON.stringify(stack), 'stack2')
              col = obj.col
              row = obj.row
              onOff = true
              console.log(obj.col, obj.row, 'col, row')
              console.log('没有正确值需要回溯')
            }
          }
        } else {
          row++
        }
      }
      col++
    }
    console.log(stack, 'allArr')
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
