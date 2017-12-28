import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchArrNum} from '../store/actions'
console.log(fetchArrNum, '!!!!!!!!!!!')
class ArrTable extends Component {
  state = {}
  change (e, col, row) {
    let value = e.target.value
    if (value === '0') {
      e.target.value = ''
    }
    if (!value) {
      value = 0
    }
    this.props.fetchArrNum(parseFloat(value), col, row)
  }
  render() {

    let allBody = []
    for (let col = 0; col < 9; col++) {
      let allTr = []
      for (let row = 0; row < 9; row++) {
        let value = ''
        if (this.props.arr ) {
          value = this.props.arr[col][row] === 0 ? '' : this.props.arr[col][row] + ''
        }
        console.log(value,'@@@@@@@@@@@@@@@')
        allTr.push(
          <td key={row}>
            <input type = "number" value={value} maxLength = "1" onChange={(e) => this.change(e, col, row)}/>
          </td>
        )
      }
      allBody.push(
        <tr key={col}>
          {allTr}
        </tr>
      )
    }
    return (
      <div className="arrTableBox">
        <table border="1" className="fatherTable">
          <tbody>
          {allBody}
          </tbody>
        </table>
      </div>
    );
  }
}

// export default Table;


export default connect(
  state => ({
    arr: state.arrTable.arr
  }),
  dispatch => bindActionCreators({
    fetchArrNum
  }, dispatch)
)(ArrTable)
