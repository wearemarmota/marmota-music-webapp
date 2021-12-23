import {
  ADD_QUEUE_SONGS,
  REMOVE_QUEUE_INDEX,
  REPLACE_QUEUE_SONGS,
  SET_QUEUE_VISIBLE,
  MOVE_QUEUE_PREV_SONG,
  MOVE_QUEUE_NEXT_SONG,
  SET_CURRENT_SONG_INDEX,
  SET_PLAYING,
  SET_CURRENT_TIME,
  SET_CURRENT_PERCENTAGE,
  SET_LOADED_PORTIONS,
} from "../actionTypes";

export const setQueueVisible = (visible) => ({
  type: SET_QUEUE_VISIBLE,
  payload: { visible },
});

export const setCurrentSong = (index) => ({
  type: SET_CURRENT_SONG_INDEX,
  payload: { index },
});

export const addQueueSongs = (songs) => ({
  type: ADD_QUEUE_SONGS,
  payload: { songs },
});

export const replaceQueueSongs = (songs) => ({
  type: REPLACE_QUEUE_SONGS,
  payload: { songs },
});

export const setPlaying = (playing) => ({
  type: SET_PLAYING,
  payload: { playing },
});

export const removeIndex = (index) => ({
  type: REMOVE_QUEUE_INDEX,
  payload: { index },
});

export const moveQueueNextSong = () => ({
  type: MOVE_QUEUE_NEXT_SONG,
});

export const moveQueuePrevSong = () => ({
  type: MOVE_QUEUE_PREV_SONG,
});

export const setCurrentTime = (time = 0) => ({
  type: SET_CURRENT_TIME,
  payload: { time },
});

export const setCurrentPercentage = (percentage = 0) => ({
  type: SET_CURRENT_PERCENTAGE,
  payload: { percentage },
});

export const setLoadedPortions = (portions = []) => ({
  type: SET_LOADED_PORTIONS,
  payload: { portions },
});
