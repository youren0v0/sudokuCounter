import React, { Component } from 'react';

class NewGame extends Component {
  choose (e) {
    console.log(e.target.value)
    let level = e.target.value
    const { history } = this.props
    if (level) {
      history.push(`/newGame/${level}`)
    }
  }
  render() {
    return (
      <div>
       <h3>new game</h3>
        <select value="" onChange={(e) => this.choose(e)}>
          <option value="" disabled="disabled">Please select a level</option>
          <option>easy</option>
          <option>hard</option>
          <option>hell</option>
        </select>
      </div>
    );
  }
}

export default NewGame;
