

import React, { Component, SyntheticEvent, TouchEvent as ReactTouchEvent, createRef, RefObject } from 'react';
import './TempoInput.css';
import getRepeatedMouseDownHandler from '../../utils/getRepeatedMouseDownHandler';

type Props = {
  bpm: number,
  changeTempo: (tempo: number) => void
};

export default class TempoInput extends Component<Props> {
  increaseHandler = getRepeatedMouseDownHandler(500, 30, (e) => {
    e.nativeEvent.stopImmediatePropagation();
    this.props.changeTempo(this.props.bpm + 1);
  });

  decreaseHandler = getRepeatedMouseDownHandler(500, 30, (e) => {
    e.nativeEvent.stopImmediatePropagation();
    this.props.changeTempo(this.props.bpm - 1);
  });

  handleInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.props.changeTempo(Number(e.currentTarget.value));
  };

  render() {
    return (
      <div className="tempo-input">
        <div className="bpm-input">
          <label>BPM</label>
          <input type="number" value={this.props.bpm} onChange={this.handleInputChange} />
        </div>
        <div className="tempo-controls">
          <button className="carrot-flat-button no-select" onMouseDown={this.increaseHandler} onTouchStart={this.increaseHandler}>+</button>
          <button className="carrot-flat-button no-select" onMouseDown={this.decreaseHandler} onTouchStart={this.decreaseHandler}>-</button>
        </div>
      </div>
    );

  }
}
