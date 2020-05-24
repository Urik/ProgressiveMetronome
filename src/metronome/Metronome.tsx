

import React, { Component, SyntheticEvent } from 'react';
import { debounce } from 'lodash/fp';
import './Metronome.scss';
import '../utils/helpers.scss';
import TempoInput from './TempoInput/TempoInput';
import { SPACE } from '../utils/keyConstants';
import { BarPlayer } from './BarPlayer';
import { createBar } from '../music-beats/bar';
import { Song } from './Song';
import { SongsList } from './SongsList';

type State = {
  bpm: number,
  playingSound: boolean,
  subdivisions: number,
  songs: Song[],
  selectedSong?: Song,
};

type Props = { defaultBpm: number };
class Metronome extends Component<Props, State> {
  playingInterval: any = null;

  private barPlayer: BarPlayer;

  constructor(props: Props) {
    super(props);

    const savedTempo = localStorage['tempo'];
    const tempo: number = savedTempo != null ? Number(savedTempo) : this.props.defaultBpm;

    this.state = {
      bpm: tempo,
      playingSound: false,
      subdivisions: 0,
      songs: [],
      selectedSong: undefined
    };

    this.play = debounce(50, this.play).bind(this);
    this.barPlayer = new BarPlayer(createBar(this.state.subdivisions), this.state.bpm);
    document.addEventListener('keydown', this.toggleOnSpacePress);
  }

  saveSongList(songs: Song[]) {
    localStorage.setItem('songs', JSON.stringify(songs));
  }

  togglePlay = () => {
    this.setState((prevState: State) => {
      const playing = !prevState.playingSound;
      if (playing) {
        this.play(prevState.bpm);
      } else {
        this.barPlayer.stop();
      }

      return { ...prevState, playingSound: playing };
    });
  };

  play = (bpm: number) => {
    this.barPlayer.setTempo(bpm);
    this.barPlayer.start();
  };

  changeTempo = (newBpm: number) => {
    this.setState(prevState => ({ ...prevState, bpm: newBpm }));
    if (this.state.playingSound) {
      this.barPlayer.setTempo(newBpm);
    }

    if (this.state.selectedSong) {
      this.state.selectedSong.tempo = newBpm;
      this.saveSongList(this.state.songs);
    }

    localStorage.setItem('tempo', String(newBpm));
  };

  changeSubdivisions = (event: SyntheticEvent<HTMLInputElement>) => {
    const newDivisions = event.currentTarget.valueAsNumber;
    this.setState(previousState => ({ ...previousState, subdivisions: newDivisions}));
    this.barPlayer.setBar(createBar(newDivisions));
  };

  private isEventComingFromInput(e: KeyboardEvent): boolean {
    return e.target instanceof HTMLInputElement && e.target.tagName.toLowerCase() === 'input';
  }

  toggleOnSpacePress = (e: KeyboardEvent) => {
    if (e.keyCode === SPACE && !this.isEventComingFromInput(e)) {
      this.togglePlay();
    }
  };

  async componentWillMount() {
    const songs = JSON.parse(localStorage.getItem('songs') || '[]');
    await this.setState({
      songs,
    });
    if (songs[0]) {
      this.selectSong(songs[0]);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.toggleOnSpacePress);
  }

  songListModified(newSongList: Song[]) {
    this.saveSongList(newSongList);
    this.setState({ songs: newSongList })
  }

  selectSong = async (song: Song): Promise<void> => {
    await this.setState({ selectedSong: song });
    this.changeTempo(song.tempo);
  };

  render() {
    const playButtonClass = this.state.playingSound ? 'fa-stop' : 'fa-play';
    return (
      <div className="metronome">
        <div className="tempo-input">
          <TempoInput bpm={this.state.bpm} changeTempo={this.changeTempo} />
        </div>
        <div>
          <input type="number" value={this.state.subdivisions} onChange={this.changeSubdivisions}/>
        </div>
        <button className="button is-link is-light start-button full-width" onClick={this.togglePlay}>
          <span className={`fa ${playButtonClass}`} />
        </button>

        <div className="songs-list full-width">
          <SongsList
            songs={this.state.songs}
            currentTempo={this.state.bpm}
            selectedSong={this.state.selectedSong}
            songSelected={this.selectSong.bind(this)}
            songListHasBeenModified={this.songListModified.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Metronome;
