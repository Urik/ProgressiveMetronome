// @flow

import type { TimeSignature } from './TimeSignature';

class MusicalBeat {
  timeSignature: TimeSignature;

  constructor(timeSignature?: TimeSignature) {
    this.timeSignature = timeSignature != null ? timeSignature : [4, 'quarter'];
  }
}