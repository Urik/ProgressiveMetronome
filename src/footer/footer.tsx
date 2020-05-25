import React from 'react';

import linkedIn from './linkedin-log.png';
import './footer.scss';

export function Footer() {
  return (
    <section className="section app-footer">
      <div className="app-footer">
        <p>
          Created by Uri Berman Kleiner
          <a
            href="https://www.linkedin.com/in/bermanuri"
            target="_blank"
            title="I'm on LinkedIn!"
          >
            <img className="linkedin-logo" src={linkedIn} />
          </a>
        </p>
        <p>
          Icons made by <a href="https://www.flaticon.com/authors/smashicons">Smashicons</a> and <a href="https://www.flaticon.com/authors/freepik">Freepik</a> from <a href="https://www.flaticon.com/">www.flaticon.com</a>
        </p>
      </div>
    </section>
  );
}
