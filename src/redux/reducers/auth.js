import { SET_AUTH, UNSET_AUTH } from "../actionTypes";

const initialState = {
  isLogged: false,
  token: null,
  profile: null,
}

const authReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_AUTH: {
      const { token, profile } = action.payload;
      return {
        ...state,
        isLogged: true,
        token,
        profile,
      };
    }
    case UNSET_AUTH: {
      return initialState;
    }
    default:
      return state;
  }
}

export default authReducer;