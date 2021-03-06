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

function update(artistId, name){
  return request({
    url: `/artists/${artistId}`,
    method: "PATCH",
    data: {
      name: name,
    },
  });
}


function updateAvatar(artistId, file) {
  // Check: https://github.com/axios/axios/blob/master/examples/upload/index.html#L30-L32
  // for upload proggress:

  var bodyFormData = new FormData();
  bodyFormData.append("image", file);
  bodyFormData.append("_method", "PATCH");

  return request({
    url: `/artists/${artistId}`,
    method: "POST",
    data: bodyFormData,
    headers: {
      "content-type": "multipart/form-data",
    },
  });
}

const ArtistsService = {
  list,
  get,
  find,
  create,
  update,
  updateAvatar,
};

export default ArtistsService;
