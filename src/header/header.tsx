import React from 'react';
import logo from './metronome.svg';

import './header.scss';

export function Header() {
  return (
    <>
      <div className="header">
        <img className="logo" src={logo} alt="metronome drawing"/>
        <h1 className="header-title">Clickie</h1>
      </div>
    </>
  );
}
