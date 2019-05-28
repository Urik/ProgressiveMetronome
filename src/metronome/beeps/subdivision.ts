

import { Howl } from 'howler';
import divisionPath from '../sound-clips/division.wav';

const audio = new Howl({ src: divisionPath });
export const subdivision = {
  play() {
    return Promise.resolve((audio.play()));
  }
};