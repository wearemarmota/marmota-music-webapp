import request from "./api-service";

function listByAlbum(album) {
  return request({
    url: `/albums/${album}/songs`,
    method: "GET",
  });
}

function create(title, albumId, file) {
  // Check: https://github.com/axios/axios/blob/master/examples/upload/index.html#L30-L32
  // for upload proggress:

  var bodyFormData = new FormData();
  bodyFormData.append("title", title);
  bodyFormData.append("album_id", albumId);
  bodyFormData.append("song", file);

  return request({
    url: `/songs`,
    method: "POST",
    data: bodyFormData,
    headers: {
      "content-type": "multipart/form-data",
    },
  });
}

const SongsService = {
  listByAlbum,
  create,
};

export default SongsService;
