import { repeat } from 'ramda';
import { MusicMeasure } from './musicMeasure';

export type Bar = MusicMeasure[];

export function createBar(subdivisionsCount: number) {
    return [MusicMeasure.Beat, ...repeat(MusicMeasure.Subdivision, subdivisionsCount)];
}