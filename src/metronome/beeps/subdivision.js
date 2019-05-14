// @flow

import { Howl } from 'howler';
import { type Beep } from './beep';
import divisionPath from '../sound-clips/division.wav';

const audio = new Howl({ src: divisionPath });
const subdivision: Beep<*> = {
  play() {
    return Promise.resolve((audio.play(): number));
  }
};