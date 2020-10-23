import request from "./api-service";

function get(albumId) {
  return request({
    url: `/albums/${albumId}`,
    method: "GET",
  });
}

function list(options) {
  return request({
    url: `/albums`,
    method: "GET",
    params: options,
  });
}

function listByArtist(artist) {
  return request({
    url: `/artists/${artist}/albums`,
    method: "GET",
  });
}

function find(name, exact = false) {
  return request({
    url: `/albums`,
    method: "GET",
    params: {
      name: name,
      exact: exact ? "true" : "",
    },
  });
}

function findByArtist(artist, title, exact = false) {
  return request({
    url: `/artists/${artist}/albums`,
    method: "GET",
    params: {
      title: title,
      exact: exact ? "true" : "",
    },
  });
}

function create(title, artistId) {
  return request({
    url: `/albums`,
    method: "POST",
    data: {
      title: title,
      artist_id: artistId,
    },
  });
}

function updateCover(albumId, file) {
  // Check: https://github.com/axios/axios/blob/master/examples/upload/index.html#L30-L32
  // for upload proggress:

  var bodyFormData = new FormData();
  bodyFormData.append("cover", file);
  bodyFormData.append("_method", "PATCH");

  return request({
    url: `/albums/${albumId}`,
    method: "POST",
    data: bodyFormData,
    headers: {
      "content-type": "multipart/form-data",
    },
  });
}

function update(albumId, title){
  return request({
    url: `/albums/${albumId}`,
    method: "PATCH",
    data: {
      title: title,
    },
  });
}

const AlbumsService = {
  get,
  list,
  listByArtist,
  find,
  findByArtist,
  create,
  updateCover,
  update,
};

export default AlbumsService;
