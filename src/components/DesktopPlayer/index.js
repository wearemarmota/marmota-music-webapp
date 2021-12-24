import { useMemo, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  moveQueueNextSong,
  moveQueuePrevSong,
  setPlaying,
} from "../../redux/actions/queue";

import SeekBar from "./SeekBar";
import CurrentSong from "./CurrentSong";
import Controls from "./Controls";
import Context from "./Context";

import "./index.scss";

const Player = () => {
  const dispatch = useDispatch();

  const { currentSong, songs, playing, currentTime } = useSelector(
    (state) => state.queue
  );

  const previous = () => dispatch(moveQueuePrevSong());
  const next = () => dispatch(moveQueueNextSong());
  const play = () => {
    dispatch(setPlaying(false));
    dispatch(setPlaying(true));
  };
  const pause = () => dispatch(setPlaying(false));

  const currentSongObj = useMemo(
    () => songs[currentSong],
    [currentSong, songs]
  );

  const hasPreviousSong = useMemo(
    () => !!songs[currentSong - 1],
    [currentSong, songs]
  );

  const hasNextSong = useMemo(
    () => !!songs[currentSong + 1],
    [currentSong, songs]
  );

  return (
    <div className="player-wrapper">
      <SeekBar />
      <aside id="player">
        <CurrentSong song={currentSongObj} seconds={currentTime} />
        <Controls
          isPlaying={playing}
          currentSong={currentSongObj}
          hasPreviousSong={hasPreviousSong}
          hasNextSong={hasNextSong}
          previous={previous}
          next={next}
          play={play}
          pause={pause}
        />
        <Context />
      </aside>
    </div>
  );
};

export default Player;
