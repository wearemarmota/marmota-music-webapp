import AlbumItem from "../AlbumItem";

import "./index.scss";

const AlbumsList = ({ albums = [], showAlbumsGlow = true }) => {
  return(
    <div className="row">
      {albums.map(album => (
        <div key={album.idindex} className="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2">
          <AlbumItem album={album} showGlow={showAlbumsGlow} />
        </div>
      ))}
    </div>
  )
}

export default AlbumsList;
