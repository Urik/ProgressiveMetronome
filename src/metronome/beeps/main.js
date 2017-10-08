// @flow

import type { Beep } from './beep';
import audioPath from '../sound-clips/main.wav';


const audio = new Audio(audioPath);
const main: Beep = {
  play() {
    audio.play();
  }
};
export default main;