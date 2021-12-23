import { createContext, useEffect, useMemo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "react-use";

import {
  setCurrentTime,
  setCurrentPercentage,
  setLoadedPortions,
  moveQueueNextSong,
  setPlaying,
  moveQueuePrevSong,
} from "../redux/actions/queue";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { songs, currentSong, currentTime, playing } = useSelector(
    (state) => state.queue
  );

  const currentSongObj = useMemo(
    () => songs[currentSong],
    [currentSong, songs]
  );

  const audio = useMemo(() => new Audio(), []);

  useEffect(() => {
    audio.src = currentSongObj.source;
  }, [currentSongObj, audio]);

  const updateAudioProgress = useCallback(() => {
    const audioDuration = audio.duration;

    dispatch(setCurrentTime(audio.currentTime));
    dispatch(setCurrentPercentage((audio.currentTime * 100) / audioDuration));
    if (audio.ended && hasNextSong) {
      console.info("Song finished, has next song");
      dispatch(moveQueueNextSong());
    }

    const loadedPortions = [];
    for (let i = 0; i < audio.buffered.length; i++) {
      const fromSecond = audio.buffered.start(i);
      const toSecond = audio.buffered.end(i);
      const fromPercentage = (fromSecond * 100) / audioDuration;
      const toPercentage = (toSecond * 100) / audioDuration;
      const portion = { fromSecond, toSecond, fromPercentage, toPercentage };
      loadedPortions.push(portion);
      dispatch(setLoadedPortions(loadedPortions));
    }
  }, [dispatch, currentTime]);

  const seekTime = useCallback(
    (time) => {
      if (!audio) return;
      if (isNaN(time)) return;
      if (time < 0) return;
      if (time > audio.duration) return;
      audio.currentTime = time;
      updateAudioProgress();
    },
    [updateAudioProgress]
  );

  const previous = () => dispatch(moveQueuePrevSong());
  const next = () => dispatch(moveQueueNextSong());
  const play = () => dispatch(setPlaying(true));
  const pause = () => dispatch(setPlaying(false));
  const seekBackward = useCallback(
    () => seekTime(audio.currentTime - 10),
    [seekTime]
  );
  const seekForward = useCallback(
    () => seekTime(audio.currentTime + 10),
    [seekTime]
  );

  const artworks = useMemo(() => {
    if (!currentSongObj) return [];
    return Object.keys(currentSongObj.album.covers)
      .map((size) => {
        if (["100", "500"].includes(size))
          return {
            src: currentSongObj.album.covers[size],
            sizes: `${size}x${size}`,
            type: "image/webp",
          };
      })
      .filter((i) => i);
  }, [currentSongObj]);

  const hasNextSong = useMemo(
    () => !!songs[currentSong + 1],
    [currentSong, songs]
  );

  // Sync audioref play with redux state
  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [playing, currentSongObj, audio]);

  useInterval(() => updateAudioProgress(), 1000);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      let metadata = {
        title: currentSongObj?.title,
        artist: currentSongObj?.album.artist.name,
        album: currentSongObj?.album.title,
        artwork: artworks,
      };
      navigator.mediaSession.metadata = new window.MediaMetadata(metadata);
    }
  }, [currentSongObj, artworks]);

  useEffect(() => {
    pause();
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", function () {
        play();
      });
      navigator.mediaSession.setActionHandler("pause", function () {
        pause();
      });
      navigator.mediaSession.setActionHandler("seekbackward", function () {
        seekBackward(10);
      });
      navigator.mediaSession.setActionHandler("seekforward", function () {
        seekForward(10);
      });
      navigator.mediaSession.setActionHandler("previoustrack", function () {
        previous();
      });
      navigator.mediaSession.setActionHandler("nexttrack", function () {
        next();
      });
    }
  }, []);

  const value = {
    audio,
    seekTime,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
