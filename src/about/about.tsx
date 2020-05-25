import React from 'react';
import './about.scss';
import guitar from './guitar.svg';

export function About() {
  return (
    <section className="section about">
      <div className="guitar-wrapper">
        <img className="guitar" src={guitar} alt=""/>
      </div>
      <div className="text">
        <p>I'm Clickie, a free, no ads, mobile friendly metronome for casual use!</p>
        <p>
          My creator is pretty scatterbrained and often forgets what tempo he was on when practicing guitar and
          that's why he created me, I let him remember where he was on each song!
        </p>
        <p>
          He also wanted to learn ReactJS, and for some reason he thought I'd be a good idea for that. Silly human.
        </p>
        <a className="github-link" href="https://github.com/Urik/Clickie" target="_blank" title="Visit me on Github!">
          <p>You can visit me on Github :D !</p>
        </a>
      </div>
    </section>
  );
}
