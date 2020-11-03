import request from "./api-service";

function list(options) {
  return request({
    url: `/artists`,
    method: "GET",
    params: options,
  });
}

function get(artist) {
  return request({
    url: `/artists/${artist}`,
    method: "GET",
  });
}

function find(name, exact = false) {
  return request({
    url: `/artists`,
    method: "GET",
    params: {
      name: name,
      exact: exact ? "true" : "",
    },
  });
}

function create(name) {
  return request({
    url: `/artists`,
    method: "POST",
    data: {
      name: name,
    },
  });
}

const ArtistsService = {
  list,
  get,
  find,
  create,
};

export default ArtistsService;
