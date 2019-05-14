// @flow

import { type Beep } from './beep';
import { Howl, Howler } from 'howler';
import audioPath from '../sound-clips/main.wav';

const audio = new Howl({ src: audioPath });
export const main: Beep<*> = {
  play() {
    return Promise.resolve((audio.play(): number));
  }
};