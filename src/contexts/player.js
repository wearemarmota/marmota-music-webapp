import { createContext, useEffect, useMemo, useCallback } from "react";
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
import Logger from "../shared/logger";

const logger = new Logger("PlayerContext");

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { songs, currentSong, playing } = useSelector((state) => state.queue);

  const currentSongObj = useMemo(
    () => songs[currentSong],
    [currentSong, songs]
  );

  const hasNextSong = useMemo(
    () => !!songs[currentSong + 1],
    [currentSong, songs]
  );

  const audio = useMemo(() => {
    const audio = new Audio();
    audio.autoplay = true;
    return audio;
  }, []);

  useEffect(() => {
    audio.src = currentSongObj?.source || null;
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
  }, [
    dispatch,
    audio.buffered,
    audio.currentTime,
    audio.ended,
    audio.duration,
    hasNextSong,
  ]);

  const seekTime = useCallback(
    (time) => {
      if (!audio) return;
      if (isNaN(time)) return;
      if (time < 0) return;
      if (time > audio.duration) return;
      audio.currentTime = time;
      updateAudioProgress();
    },
    [updateAudioProgress, audio]
  );

  const previous = useCallback(() => dispatch(moveQueuePrevSong()), [dispatch]);
  const next = useCallback(() => dispatch(moveQueueNextSong()), [dispatch]);
  const play = useCallback(() => {
    dispatch(setPlaying(false));
    dispatch(setPlaying(true));
  }, [dispatch]);
  const pause = useCallback(() => dispatch(setPlaying(false)), [dispatch]);
  const seekBackward = useCallback(
    () => seekTime(audio.currentTime - 10),
    [seekTime, audio.currentTime]
  );
  const seekForward = useCallback(
    () => seekTime(audio.currentTime + 10),
    [seekTime, audio.currentTime]
  );

  const artworks = useMemo(() => {
    if (!currentSongObj) return [];
    return Object.keys(currentSongObj.album.covers)
      .map((size) => {
        if (["100", "500"].includes(size)) {
          return {
            src: currentSongObj.album.covers[size],
            sizes: `${size}x${size}`,
            type: "image/webp",
          };
        } else {
          return null;
        }
      })
      .filter((i) => i);
  }, [currentSongObj]);

  // Sync audioref play with redux state
  useEffect(() => {
    if (playing) {
      audio.play().catch((reason) => logger.warn("Unable to play", reason));
    } else {
      audio.pause();
    }
  }, [playing, currentSongObj, audio]);

  useInterval(() => updateAudioProgress(), playing ? 1000 : null);

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
  }, [play, pause, seekBackward, seekForward, previous, next]);

  useEffect(() => {
    dispatch(setPlaying(false));
  }, [dispatch]);

  const value = {
    audio,
    seekTime,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
