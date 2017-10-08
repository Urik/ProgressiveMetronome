// @flow

import React, { Component } from 'react';
import './App.css';
import Metronome from './metronome/Metronome'

class App extends Component<{a: string}> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Metronoapp</h1>
        </header>
        <Metronome defaultBpm={100}/>
      </div>
    );
  }
}

export default App;
