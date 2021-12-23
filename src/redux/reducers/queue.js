import {
  ADD_QUEUE_SONGS,
  MOVE_QUEUE_NEXT_SONG,
  MOVE_QUEUE_PREV_SONG,
  REMOVE_QUEUE_INDEX,
  REPLACE_QUEUE_SONGS,
  SET_CURRENT_SONG_INDEX,
  SET_PLAYING,
  SET_QUEUE_VISIBLE,
} from "../actionTypes";

const initialState = {
  playing: false,
  visible: false,
  currentSong: null,
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
      console.log(SET_CURRENT_SONG_INDEX);
      const { index } = action.payload;
      if (!state.songs[index]) {
        console.error(`Setting an invalid index (${index})`);
        return state;
      }
      return {
        ...state,
        currentSong: index,
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
      };
    }
    default:
      return state;
  }
};

export default queueReducer;
