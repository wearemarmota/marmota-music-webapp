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

const logger = new Logger("ApiService");

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
  baseURL: window.localStorage.getItem("api_uri"),
  headers: {
    Accept: "application/json; charset=utf-8",
    "Content-Type": "application/json; charset=utf-8",
  },
});

/**
 * Request Wrapper with default success/error actions
 */
const request = function (options) {
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
