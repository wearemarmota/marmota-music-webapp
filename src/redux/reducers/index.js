import { combineReducers } from "redux";
import search from "./search";
import auth from "./auth";

export default combineReducers({ search, auth });