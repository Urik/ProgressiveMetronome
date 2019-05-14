// @flow

import React, { Component } from 'react';
import rolex from 'rolex';
import { debounce, isNil } from 'lodash/fp';
import TempoInput from './TempoInput/TempoInput';
import './Metronome.css';
import { main as mainBeep } from './beeps/main';
import { SPACE } from '../utils/keyConstants';

type State = { bpm: number, playingSound: boolean };

type Props = { defaultBpm: number };
class Metronome extends Component<Props, State> {
  playingInterval: ?any = null;
  
  constructor(props: Props) {
    super(props);
    
    const savedTempo = localStorage['tempo'];
    const tempo: number = savedTempo != null ? Number(savedTempo) : this.props.defaultBpm;
    this.state = {
      bpm: tempo,
      playingSound: false
    };
    this.play = (debounce(50, this.play).bind(this): number => Promise<void>);
    
    document.addEventListener('keydown', this.toggleOnSpacePress);
  }
  
  togglePlay = () => {
    this.setState((prevState: State) => {
      const playing = !prevState.playingSound;
      if (playing) {
        this.play(prevState.bpm);
      } else if (this.playingInterval != null) {
        this.playingInterval.stop();
      }
      
      return { ...prevState, playingSound: playing };
    });
  };
  
  play = (bpm: number) => {
    if (this.playingInterval) {
      this.playingInterval.stop();
    }
    const interval = Math.round(60000 / bpm);
    this.playingInterval = rolex(interval, 10000000000000000, () => {
      mainBeep.play();
    });
    this.playingInterval.start();
    mainBeep.play();
  };
  
  changeTempo = (newBpm: number) => {
    this.setState(prevState => ({ ...prevState, bpm: newBpm }));
    if (this.state.playingSound) {
      this.play(newBpm);
    }
    
    localStorage.setItem('tempo', String(newBpm));
  };
  
  toggleOnSpacePress = (e: KeyboardEvent) => {
    if (e.keyCode === SPACE) {
      this.togglePlay();
    }
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.toggleOnSpacePress);
  }
  
  render() {
    const playButtonClass = this.state.playingSound ? 'fa-stop' : 'fa-play';
    return (
      <div className="metronome">
        <div className="tempo-input">
          <TempoInput bpm={this.state.bpm} changeTempo={this.changeTempo} />
        </div>
        <button className="start-button" onClick={this.togglePlay}>
          <span className={`fa ${playButtonClass}`} />
        </button>
      </div>
    );
  }
}

export default Metronome;