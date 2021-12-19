import { SET_QUEUE_VISIBLE } from "../actionTypes";

export const setQueueVisible = (visible) => ({
  type: SET_QUEUE_VISIBLE,
  payload: {
    visible,
  },
});
