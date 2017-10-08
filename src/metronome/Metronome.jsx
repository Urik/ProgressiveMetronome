// @flow

import React, { Component } from 'react';
import TempoInput from './TempoInput/TempoInput';
import './Metronome.css';
import mainBeep from './beeps/main';

type State = {| bpm: number, playingSound: boolean |};
type Props = { defaultBpm: number };
class Metronome extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      bpm: this.props.defaultBpm,
      playingSound: false
    };
  }

  togglePlay = () => {
    this.setState((prevState: State) => {
      return {
        playingSound: !prevState.playingSound
      };
    });
  };

  changeTempo = (newBpm: number) => {
    this.setState({ bpm: newBpm });
  };

  render() {
    const playButtonClass = this.state.playingSound ? 'fa-stop' : 'fa-play';
    return (
      <div className="metronome">
        <div className="tempo-input">
          <TempoInput bpm={this.state.bpm} changeTempo={this.changeTempo} />
        </div>
        <button className="start-button" onClick={this.togglePlay}>
          <span className={`fa ${playButtonClass}`} />
          {}
        </button>
      </div>
    );
  }
}

export default Metronome;
