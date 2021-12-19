import {
  SET_QUEUE_VISIBLE,
} from "../actionTypes";

const initialState = {
  visible: false,
};

const queueReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUEUE_VISIBLE: {
      const { visible } = action.payload;
      return {
        ...state,
        visible: visible,
      };
    }
    default:
      return state;
  }
};

export default queueReducer;
