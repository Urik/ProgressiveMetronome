// @flow

import React from 'react';
import './TempoInput.css';

type Props = {
  bpm: number,
  changeTempo: number => void
};

const TempoInput = (props: Props) => {
  return (
    <div className="tempo-input">
      <div className="bpm-input">
        <label>BPM</label>
        <input type="number" value={props.bpm} onChange={handleInputChange} />
      </div>
      <div className="tempo-controls">
        <button className="carrot-flat-button" onClick={() => props.changeTempo(props.bpm + 1)}>+</button>
        <button className="carrot-flat-button" onClick={() => props.changeTempo(props.bpm - 1)}>-</button>
      </div>
    </div>
  );

  function handleInputChange(e: SyntheticEvent<HTMLInputElement>) {
    props.changeTempo(Number(e.currentTarget.value));
  }
};

export default TempoInput;
