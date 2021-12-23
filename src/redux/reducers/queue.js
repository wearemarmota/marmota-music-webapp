import {
  ADD_QUEUE_SONGS,
  MOVE_QUEUE_NEXT_SONG,
  MOVE_QUEUE_PREV_SONG,
  REMOVE_QUEUE_INDEX,
  REPLACE_QUEUE_SONGS,
  SET_CURRENT_TIME,
  SET_CURRENT_PERCENTAGE,
  SET_CURRENT_SONG_INDEX,
  SET_LOADED_PORTIONS,
  SET_PLAYING,
  SET_QUEUE_VISIBLE,
} from "../actionTypes";

const initialState = {
  playing: false,
  visible: false,
  currentSong: null,
  currentTime: 0,
  currentPercentage: 0,
  loadedPortions: [],
  songs: [],
};

const queueReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYING: {
      const { playing } = action.payload;
      return {
        ...state,
        playing: playing,
      };
    }
    case SET_QUEUE_VISIBLE: {
      const { visible } = action.payload;
      return {
        ...state,
        visible: visible,
      };
    }
    case REMOVE_QUEUE_INDEX: {
      const { index } = action.payload;
      return {
        ...state,
        songs: [...state.songs.filter((song, i) => index !== i)],
      };
    }
    case ADD_QUEUE_SONGS: {
      const { songs } = action.payload;
      return {
        ...state,
        songs: [...state.songs, ...songs],
      };
    }
    case REPLACE_QUEUE_SONGS: {
      const { songs } = action.payload;
      return {
        ...state,
        songs: [...songs],
      };
    }
    case SET_CURRENT_SONG_INDEX: {
      const { index } = action.payload;
      if (!state.songs[index]) {
        console.error(`Setting an invalid index (${index})`);
        return state;
      }
      return {
        ...state,
        currentSong: index,
        currentTime: 0,
        currentPercentage: 0,
        loadedPortions: [],
      };
    }
    case MOVE_QUEUE_PREV_SONG: {
      if (!state.songs[state.currentSong - 1]) {
        console.error(`Setting an invalid index (${state.currentSong - 1})`);
        return state;
      }
      return {
        ...state,
        currentSong: state.currentSong - 1,
        currentTime: 0,
        currentPercentage: 0,
        loadedPortions: [],
      };
    }
    case MOVE_QUEUE_NEXT_SONG: {
      if (!state.songs[state.currentSong + 1]) {
        console.error(`Setting an invalid index (${state.currentSong + 1})`);
        return state;
      }
      return {
        ...state,
        currentSong: state.currentSong + 1,
        currentTime: 0,
        currentPercentage: 0,
        loadedPortions: [],
      };
    }
    case SET_CURRENT_TIME: {
      const { time } = action.payload;
      return {
        ...state,
        currentTime: time,
      };
    }
    case SET_CURRENT_PERCENTAGE: {
      const { percentage } = action.payload;
      return {
        ...state,
        currentPercentage: percentage,
      };
    }
    case SET_LOADED_PORTIONS: {
      const { portions } = action.payload;
      return {
        ...state,
        loadedPortions: [...portions],
      };
    }

    default:
      return state;
  }
};

export default queueReducer;
