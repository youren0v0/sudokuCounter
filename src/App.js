import React, { Component } from 'react'
import AppRouter from './router'
import {Link, HashRouter as Router} from 'react-router-dom'
class App extends Component {
  state = {
    pathName: '/menu/one'
  }
  render() {
    return (
      <div className="App">
        <Router>
          <ul className="home">
            <li><Link to="/newGame">new game</Link></li>
            <li><Link to="/counter">counter</Link></li>
            <li><Link to="/mine">mine</Link></li>
          </ul>
        </Router>
        <AppRouter/>
      </div>
    )
  }
}

export default App
