import React, { Component } from 'react';
import ArrTable from '../components/arrTable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {fetchArrNum} from '../store/actions'

class Counter extends Component {
  confirm () {
    console.log(this.props.arr)
  }
  clear () {
    this.props.fetchArrNum('clear')
  }
  render() {
    console.log(this.props, '~~~~~~~EWDFG')
    return (
      <div >
        <div>counter</div>
        <div>XYZ123</div>
        <div>
          <span>ABCabc</span>
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
    fetchArrNum
  }, dispatch)
)(Counter)
