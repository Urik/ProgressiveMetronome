import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import Metronome from './metronome/Metronome'

class App extends Component<{}> {
  render() {
    return (
      <section className="section">
        <div className="App container">
          <Metronome defaultBpm={100}/>
        </div>
      </section>
    );
  }
}

export default App;
