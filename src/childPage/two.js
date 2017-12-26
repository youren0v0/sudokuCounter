import React, { Component } from 'react';
import Table from '../components/table'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getTabelNum} from '../store/actions'

class Two extends Component {
  confirm () {
    alert(11111111)
  }
  clear () {
    this.props.getTabelNum({})
  }
  render() {
    return (
      <div className="App">
        <div>one</div>
        <div>XYZ123</div>
        <div>
          <span>ABCabc</span>
          <Table />
        </div>

        <button onClick={() => this.confirm()}>确认</button>
        <button onClick={() => this.clear()}>重置</button>
      </div>
    );
  }
}

// export default One;

export default connect(
  state => ({
  }),
  dispatch => bindActionCreators({
    getTabelNum
  }, dispatch)
)(Two)
