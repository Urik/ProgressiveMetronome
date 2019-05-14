// @flow

import React, { Component } from 'react';
import './App.css';
import Metronome from './metronome/Metronome'

class App extends Component<{a: string}> {
  render() {
    return (
      <div className="App">
        <Metronome defaultBpm={100}/>
      </div>
    );
  }
}

export default App;
