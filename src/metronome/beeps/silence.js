// @flow

import { type Beep } from './beep'; 

const silence: Beep<*> = {
  play() { return Promise.resolve(); }
};