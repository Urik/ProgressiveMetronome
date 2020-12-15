

import React, { Component, KeyboardEvent, SyntheticEvent } from 'react';
import './TempoInput.css';
import getRepeatedMouseDownHandler from '../../utils/getRepeatedMouseDownHandler';

type Props = {
  bpm: number,
  changeTempo: (tempo: number) => void
};

export default class TempoInput extends Component<Props> {
  increaseHandler = getRepeatedMouseDownHandler(500, 30, () => this.changeTempo(this.props.bpm + 1));
  decreaseHandler = getRepeatedMouseDownHandler(500, 30, () => this.changeTempo(this.props.bpm - 1));

  private changeTempo(tempo: number): void {
    const newTempo = tempo < 1 ? 10 : tempo;
    this.props.changeTempo(newTempo);
  }

  handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      return false;
    }
  }

  handleInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.changeTempo(Number(e.currentTarget.value));
  };

  render() {
    return (
      <div className="tempo-input">
        <div className="bpm-input">
          <label>BPM</label>
          <input type="number" value={this.props.bpm} onKeyDown={this.handleKeyDown} onChange={this.handleInputChange} />
        </div>
        <div className="tempo-controls">
          <button className="carrot-flat-button no-select" onMouseDown={this.increaseHandler} onTouchStart={this.increaseHandler} onTouchEnd={e => e.preventDefault()}>+</button>
          <button className="carrot-flat-button no-select" onMouseDown={this.decreaseHandler} onTouchStart={this.decreaseHandler} onTouchEnd={e => e.preventDefault()}>-</button>
        </div>
      </div>
    );

  }
}
