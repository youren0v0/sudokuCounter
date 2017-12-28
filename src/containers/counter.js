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
    for (let col = 0; col < 9; col++) {
      for (let row = 0; row <9;) {
        if (allArr[col][row] === 0) {
          for (let num = 1; num < 10; num ++) {
            allArr[col][row] = num
            console.log(num)
            if (valid(col, row)) {
              console.log('break')
              break
            }
          }
        } else {
          row++
        }
      }
    }
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
