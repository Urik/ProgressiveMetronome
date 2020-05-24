import React, { Component } from 'react';
import ReactGA from 'react-ga';

import Metronome from './metronome/Metronome'
import { Header } from './header/header';
import { Footer } from './footer/footer';
import 'bulma/css/bulma.min.css';
import './App.css';

class App extends Component<{}> {
  componentWillMount() {
    console.log(process.env);
    if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_GOOGLE_ANALYTICS) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
      ReactGA.pageview(window.location.pathname);
    }
  }

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
