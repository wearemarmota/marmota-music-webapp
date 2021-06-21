import { SET_HOME_LAST } from "../actionTypes";

export const setHomeLast = (albums = []) => ({
  type: SET_HOME_LAST,
  payload: {
    albums,
  }
});