import React, { Component } from 'react';
import ArrTable from '../components/arrTable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getTabelNum} from '../store/actions'
import { Button, Icon, Radio } from 'antd';
// import 'antd/dist/antd.css'
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
        <h3><Button type="primary" size="default" onClick={() => this.goBack()}><Icon type="left" />返回</Button>{match.params.level} game</h3>
        <div>XYZ123</div>
        <div>
          <span>ABCabc</span>
          <ArrTable />
        </div>
        <Radio.Group size="large">
          <Radio.Button onClick={() => this.confirm()}>确认</Radio.Button>
          <Radio.Button onClick={() => this.clear()}>重置</Radio.Button>
        </Radio.Group>
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
