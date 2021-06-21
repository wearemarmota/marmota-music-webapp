import { SET_HOME_LAST } from "../actionTypes";

const initialState = {
  homeLast: [],
}

const listsReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_HOME_LAST: {
      const { albums } = action.payload;
      return {
        ...state,
        homeLast: albums,
      };
    }
    default:
      return state;
  }
}

export default listsReducer;