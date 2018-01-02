import React, { Component } from 'react';
import ArrTable from '../components/arrTable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {fetchArrNum, clearArr, setAllArr} from '../store/actions'

class Counter extends Component {
  confirm () {
    // 解答器
    let startTime = new Date().getTime()
    console.log(this.props.arr)
    let allArr = this.props.arr
    let valid = (col, row) => {
      // 九宫格判定
      let bigCol = Math.floor(col/3)*3  // 小九宫格在数独里的坐标
      let bigRow = Math.floor(row/3)*3  // 小九宫格在数独里的坐标
      let _i = col%3                    // 自己在小九宫格内的坐标
      let _j = row%3                    // 自己在小九宫格内的坐标
      for (let i = 0; i < 3; i++ ) {
        for (let j = 0; j < 3; j++) {
          // 需要先排除自己
          if (i !== _i && j !== _j && allArr[bigCol + i][bigRow + j] === allArr[col][row]) {
            return false
          }
        }
      }
      // 十字格判定
      for (let i = 0; i < 9; i++) {
        if (i !== col && allArr[i][row] === allArr[col][row]) {
          return false
        }
        if (i !== row && allArr[col][i] === allArr[col][row]) {
          return false
        }
      }
      return true
    }

    // 循环遍历
    let tryNum = 0
    let stack = []
    let onOff = false                        // 判断是否是再次进入的开关
    for (let col = 0; col < 9;) {
      for (let row = 0; row <9;) {
        // if (tryNum > 5000) {
        //   return
        //   //调试用
        // }
        if (allArr[col][row] === 0 || onOff) {
          onOff = false                        // 关上回溯开关,每次都要执行,是不是会浪费时间?
          for (let num = 1; num < 10;) {
            tryNum++
            allArr[col][row] += 1             // 填入数字自加比较好,等于num不是很方便
            if (allArr[col][row] < 10 && valid(col, row)) {            // 判断是否是正确数值
              stack.push({col, row})          // 记录正确点位
              break                           // 得到了一个正确值
            }
            num = allArr[col][row] + 1        // num设置为最新值+1
            if (num >= 10) {                  // 没有正确值需要回溯
              allArr[col][row] = 0
              let obj = stack.pop()           // 抽取并删除最后一个点位
              col = obj.col                   // 重置col和row
              row = obj.row
              if (stack.length === 0 && allArr[col][row] === 9) {
                console.log(JSON.stringify(stack), 'stack')
                let time = (new Date().getTime() - startTime)/1000 + 's'
                this.setState({time, tryNum})
                alert('无解')
                return
              }
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
    let time = (new Date().getTime() - startTime)/1000 + 's'
    this.setState({time, tryNum})
    this.props.setAllArr(allArr)
  }
  clear () {
    this.props.clearArr()
  }
  change (e) {
    this.setState({allNum: e.target.value})
  }
  state = {
    allNum: '',
    time: '',
    tryNum: ''
  }
  setArr () {
    let allArr = []
    let arr = this.state.allNum.split('').map((item) => {
      return parseFloat(item)
    })
    for (let i = 0, len = arr.length; i < len;) {
      allArr.push(arr.slice(i, i += 9))
    }
    this.setState({allNum: ''})
    this.props.setAllArr(allArr)
  }
  render() {
    return (
      <div className="counter">
        <h4>counter</h4>
        <div>
          <input type="text" value={this.state.allNum} placeholder="快速导入81位数字" onChange={(e) => this.change(e)}/>
          <button onClick={() => this.setArr()}>导入</button>
        </div>
        <div className="col">123456789</div>
        <div>
          <div className="row">123456789</div>
          <ArrTable />
        </div>
        <div>
          <span>用时:{this.state.time}</span>
          <span>尝试次数:{this.state.tryNum}</span>
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
    clearArr,
    setAllArr
  }, dispatch)
)(Counter)
