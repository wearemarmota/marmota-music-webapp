import { combineReducers } from "redux";
import search from "./search";
import auth from "./auth";
import lists from "./lists";
import queue from "./queue";

export default combineReducers({ search, auth, lists, queue });
