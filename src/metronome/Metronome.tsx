

import React, { Component, SyntheticEvent } from 'react';
import { repeat } from 'ramda';
import { debounce, isNil } from 'lodash/fp';
import TempoInput from './TempoInput/TempoInput';
import './Metronome.css';
import { SPACE } from '../utils/keyConstants';
import { BarPlayer } from './BarPlayer';
import { createBar } from '../music-beats/bar';

type State = { bpm: number, playingSound: boolean, subdivisions: number };

type Props = { defaultBpm: number };
class Metronome extends Component<Props, State> {
  playingInterval: any = null;

  private barPlayer: BarPlayer;

  constructor(props: Props) {
    super(props);
    
    const savedTempo = localStorage['tempo'];
    const tempo: number = savedTempo != null ? Number(savedTempo) : this.props.defaultBpm;
    this.state = {
      bpm: tempo,
      playingSound: false,
      subdivisions: 0
    };
    this.play = debounce(50, this.play).bind(this);
    this.barPlayer = new BarPlayer(createBar(this.state.subdivisions), this.state.bpm);
    document.addEventListener('keydown', this.toggleOnSpacePress);
  }
  
  togglePlay = () => {
    this.setState((prevState: State) => {
      const playing = !prevState.playingSound;
      if (playing) {
        this.play(prevState.bpm);
      } else {
        this.barPlayer.stop();
      }
      
      return { ...prevState, playingSound: playing };
    });
  };
  
  play = (bpm: number) => {
    this.barPlayer.setTempo(bpm);
    this.barPlayer.start();
  };
  
  changeTempo = (newBpm: number) => {
    this.setState(prevState => ({ ...prevState, bpm: newBpm }));
    if (this.state.playingSound) {
      this.barPlayer.setTempo(newBpm);
    }
    
    localStorage.setItem('tempo', String(newBpm));
  };

  changeSubdivisions = (event: SyntheticEvent<HTMLInputElement>) => {
    const newDivisions = event.currentTarget.valueAsNumber;
    this.setState(previousState => ({ ...previousState, subdivisions: newDivisions}));
    this.barPlayer.setBar(createBar(newDivisions));
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
        <div>
          <input type="number" value={this.state.subdivisions} onChange={this.changeSubdivisions}/>
        </div>
        <button className="start-button" onClick={this.togglePlay}>
          <span className={`fa ${playButtonClass}`} />
        </button>
      </div>
    );
  }
}

export default Metronome;