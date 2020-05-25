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
          My creator is pretty forgetful and often forgets what tempo he was on when practicing a song, that's why he created me, I let him remember where he was!
        </p>
        <p>
          He also wanted to learn ReactJS, and for some reason thought I'd be a good idea. Silly human.
        </p>
        <a className="github-link" href="https://github.com/Urik/Clickie" target="_blank" title="Visit me on Github!">
          <p>You can visit me on Github :D !</p>
        </a>
      </div>
    </section>
  );
}
