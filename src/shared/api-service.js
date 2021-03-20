/**
 * Axios Request Wrapper
 * ---------------------
 *
 * @author  Sheharyar Naseer (@sheharyarn)
 * @license MIT
 * @link    https://gist.github.com/sheharyarn/7f43ef98c5363a34652e60259370d2cb
 */

import axios from "axios";
import Logger from "./logger";
import jwt_decode from "jwt-decode";
import { store } from "../redux/store";
import { unsetAuth } from "../redux/actions/auth";

const logger = new Logger("ApiService");
let token = null;
let client;

// Awesome idea from: https://daveceddia.com/access-redux-store-outside-react/
export const setClientWithAuth = (_token = null) => {

  token = _token;

  let headers = {
    "Accept": "application/json; charset=utf-8",
    "Content-Type": "application/json; charset=utf-8",
  };

  if(token !== null){
    headers["Authorization"] = `Bearer ${token}`;
  }

  client = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URI,
    headers,
  });
};

setClientWithAuth();

const isTokenExpValid = () => {
  if(!token) return true;
  const decoded = jwt_decode(token);
  const expiry = decoded.exp;
  const now = Date.now()/1000;
  const remainingSeconds = Math.abs(expiry - now);
  if(remainingSeconds <= 0){
    logger.warn("Token expired, remove auth");
    store.dispatch(unsetAuth());
    return false;
  }
  return true;
}

/**
 * Request Wrapper with default success/error actions
 */
const request = function (options) {

  // isTokenExpValid();
  if(!isTokenExpValid()) return new Promise((resolve, reject) => {
    logger.error("Token expired");
    reject("Token expired");
  });

  const onSuccess = function (response) {
    logger.log(
      response.config.method.toUpperCase(),
      response.config.url,
      "request successful:",
      response
    );
    return response.data.data;
  };

  const onError = function (error) {
    logger.error("Request Failed:", error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
