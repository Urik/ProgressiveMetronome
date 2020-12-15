import React from 'react';
import './about.scss';
import guitar from './guitar.svg';

export function About() {
  return (
    <section className="section about">
      <div className="guitar-wrapper">
        <img className="guitar" src={guitar} alt="guitar drawing"/>
      </div>
      <div className="text">
        <h2>I'm Clickie, a free, no ads, mobile friendly metronome for casual use!</h2>
        <p>
          My creator is pretty scatterbrained and often forgets what tempo he was on when practicing guitar.
          That's why he created me, I let him remember where he was on each song!
        </p>
        <a className="github-link" rel="noopener noreferrer" href="https://github.com/Urik/Clickie" target="_blank" title="Visit me on Github!">
          <p>You can visit me on Github :D !</p>
        </a>
      </div>
    </section>
  );
}
