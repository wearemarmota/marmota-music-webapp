import request from "./api-service";

function list() {
  return request({
    url: `/favorites`,
    method: "GET",
  });
}

function create(songId) {
  return request({
    url: `/favorites`,
    method: "POST",
    params: {
      song_id: songId,
    }
  });
}

function remove(songId) {
  return request({
    url: `/favorites/${songId}`,
    method: "DELETE",
  });
}

const SearchService = {
  list,
  create,
  remove,
};

export default SearchService;
