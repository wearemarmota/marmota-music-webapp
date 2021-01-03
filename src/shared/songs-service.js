import request from "./api-service";

function listByAlbum(album) {
  return request({
    url: `/albums/${album}/songs`,
    method: "GET",
  });
}

function create(title, albumId, file, onUploadProgress = null) {
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
    onUploadProgress: onUploadProgress,
  });
}

function update(songId, title){
  return request({
    url: `/songs/${songId}`,
    method: "PATCH",
    data: {
      title: title,
    },
  })
}
function remove(songId) {
  return request({
    url: `/songs/${songId}`,
    method: "DELETE",
  });
}

const SongsService = {
  listByAlbum,
  create,
  update,
  remove,
};

export default SongsService;
