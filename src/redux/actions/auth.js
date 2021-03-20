import { SET_AUTH, UNSET_AUTH } from "../actionTypes";

export const setAuth = (token = "", profile = {}) => ({
  type: SET_AUTH,
  payload: {
    token,
    profile,
  }
});

export const unsetAuth = () => ({ type: UNSET_AUTH });