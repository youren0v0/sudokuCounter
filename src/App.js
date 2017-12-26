import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import One from './childPage/one'

class App extends Component {
  render() {
    return (
      <div className="App">
        <One/>
      </div>
    );
  }
}

export default App;
