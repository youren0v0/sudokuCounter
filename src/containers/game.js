import React, { Component } from 'react';
import Table from '../components/table'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getTabelNum} from '../store/actions'

class Game extends Component {
  confirm () {
    console.log(this.props.num)
    let num = console.log(this.props.num)
    
  }
  clear () {
    this.props.getTabelNum({})
  }
  goBack () {
    this.props.history.goBack()
  }
  render() {
    const { match } = this.props
    console.log(match.params)
    return (
      <div>
        <h3><button onClick={() => this.goBack()}>返回</button>{match.params.level} game</h3>
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
    num: state.table.num
  }),
  dispatch => bindActionCreators({
    getTabelNum
  }, dispatch)
)(Game)
