import React, { Component } from 'react'
import AppRouter from './router'
import { Home } from './containers'
import {HashRouter as Router} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Home />
        </Router>
      </div>
    )
  }
}

export default App
