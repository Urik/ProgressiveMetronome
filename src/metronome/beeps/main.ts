

import { Howl } from 'howler';
import audioPath from '../sound-clips/main.wav';

const audio = new Howl({ src: audioPath });
export const main = {
  play() {
    return Promise.resolve(audio.play());
  }
};
