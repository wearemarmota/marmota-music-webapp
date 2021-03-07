import { SET_SEARCH_TERM } from "../actionTypes";

const initialState = {
  searchTerm: "",
}

export default function(state = initialState, action){
  switch(action.type){
    case SET_SEARCH_TERM: {
      const { searchTerm } = action.payload;
      return {
        ...state,
        searchTerm: searchTerm,
      };
    }
    default:
      return state;
  }
}