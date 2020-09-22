import request from "./api-service";

function list() {
  return request({
    url: `/albums`,
    method: "GET",
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

const AlbumsService = {
  list,
  listByArtist,
  find,
  findByArtist,
  create,
};

export default AlbumsService;
