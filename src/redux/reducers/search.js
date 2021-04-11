import { SET_SEARCH_TERM } from "../actionTypes";

const initialState = {
  searchTerm: "",
}

const searchReducer = (state = initialState, action) => {
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

export default searchReducer;