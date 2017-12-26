import React, { Component } from 'react';
import './table.less';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SmalllTable from './smallTable'
class Table extends Component {
  state = {
    num2letterI: {
      1: 'A',
      2: 'B',
      3: 'C'
    },
    num2letterJ: {
      1: 'X',
      2: 'Y',
      3: 'Z'
    }
  }
  render() {
    let allBody = []
    for (let i = 1; i < 4; i++) {
      let keyI = this.state.num2letterI[i]
      let allTr = []
      for (let j = 1; j < 4; j++) {
        let keyJ = this.state.num2letterJ[j]
        allTr.push(
          <td key={keyJ}>
            <SmalllTable tableBoxKey={{'i': keyI, 'j': keyJ}}/>
          </td>
        )
      }
      allBody.push(
        <tr key={keyI}>
          {allTr}
        </tr>
      )
    }
    return (
      <div className="tableBox">

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
    num: state.table.num
  }),
  dispatch => bindActionCreators({
  }, dispatch)
)(Table)
