import React, { Component } from 'react'
import {NewGame, Game, Counter, Mine} from '../containers'
import {Redirect, Route, HashRouter as Router} from 'react-router-dom'

class AppRouter extends Component {
  state = {
    pathName: '/menu/one'
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={NewGame}></Route>
          <Route path="/newGame" component={NewGame} ></Route>
          <Route path="/game/:level" component={Game} ></Route>
          <Route path="/newGame/:level" render={({ match }) => {
            console.log(match)
            return <Redirect to={`/game/${match.params.level}`}></Redirect>
          }}></Route>
          <Route path="/counter" component={Counter} ></Route>
          <Route path="/mine" component={Mine} ></Route>
        </div>
      </Router>
    )
  }
}

export default AppRouter
