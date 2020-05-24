import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import Metronome from './metronome/Metronome'
import { Header } from './header/header';
import { Footer } from './footer/footer';

class App extends Component<{}> {
  render() {
    return (
      <>
        <section className="section application">
          <div className="App container">
            <div className="header">
              <Header />
            </div>
            <Metronome defaultBpm={100}/>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

export default App;
