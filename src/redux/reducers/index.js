import { combineReducers } from "redux";
import search from "./search";
import auth from "./auth";
import lists from "./lists";

export default combineReducers({ search, auth, lists });