import React from 'react';
import logo from './metronome.svg';

import './header.scss';

export function Header() {
  return (
    <>
      <div className="header">
        <img className="logo" src={logo} alt="metronome drawing"/>
        <span className="header-title">Clickie</span>
      </div>
    </>
  );
}
