import React, { Component } from 'react'
import {NewGame, Game, Counter, Mine} from '../containers'
import {Redirect, Route, HashRouter as Router, Switch} from 'react-router-dom'

class AppRouter extends Component {
  state = {
    pathName: '/menu/one'
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={NewGame}></Route>
            <Route path="/newGame" component={NewGame} ></Route>
            <Route path="/game/:level" component={Game} ></Route>

            <Route path="/counter" component={Counter} ></Route>
            <Route path="/mine" component={Mine} ></Route>
            <Route render={() => <span>以上没有的时候显示这个</span>} />
          </Switch>
          <Route path="/newGame/:level" render={({ match }) => {
            console.log(match, 'match!!!!!!!!!')
            return <Redirect to={`/game/${match.params.level}`}></Redirect>
          }}></Route>
        </div>
      </Router>
    )
  }
}

export default AppRouter

// switch 内部不能用redirect重定向
// switch 前面找不到的时候,显示最后一位route
