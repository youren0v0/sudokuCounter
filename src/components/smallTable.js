import React, { Component } from 'react';
import './table.less';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getTabelNum} from '../store/actions'
class SmallTable extends Component {
  state = {
    num2letterI: {
      1: 'a',
      2: 'b',
      3: 'c'
    },
    num2letterJ: {
      1: 'x',
      2: 'y',
      3: 'z'
    },
    tableBoxKey: {
      'i': '',
      'j': ''
    }
  }
  componentWillMount () {
    const { getTabelNum, tableBoxKey } = this.props
    this.getTabelNum = getTabelNum
    this.setState({
      tableBoxKey: tableBoxKey
    });
  }
  change (e, key) {
    let numObj = {}
    numObj[key] = e.target.value
    this.getTabelNum(numObj)
  }
  render() {
    let allBody = []
    for (let i = 1; i < 4; i++) {
      let keyI = this.state.num2letterI[i]
      let allTr = []
      for (let j = 1; j < 4; j++) {
        let keyJ = this.state.num2letterJ[j]
        let key = this.state.tableBoxKey.i + keyI + this.state.tableBoxKey.j + keyJ
        let value = ''
        if (this.props.num && this.props.num[key]){
          value = this.props.num[key]
        }
        allTr.push(
          <td key={keyJ}>
            <input type = "text" maxLength = "1" value = {value} onChange={(e) => this.change(e, key)}/>
          </td>
        )
      }
      allBody.push(
        <tr key={keyI}>
          {allTr}
        </tr>
      )
    }
    // let allTr = ['', '', '']
    // allTr = allTr.map((item, index) => {
    //   console.log(item)
    //   return (
    //     <td key={index}>
    //       <input type = "text" maxLength = "1"/>
    //     </td>
    //   )
    // }.bind(this))
    return (
      <table border="1" className="childTable">
        <tbody>
        {allBody}
        </tbody>
      </table>
    )
  }
}

// export default SmallTable;


export default connect(
  state => ({
    num: state.table.num
  }),
  dispatch => bindActionCreators({
    getTabelNum
  }, dispatch)
)(SmallTable)
