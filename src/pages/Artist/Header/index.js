import React from "react";
import sortBy from "lodash/sortBy";
import ArtistImage from "../../../components/ArtistItem/Image"

import "./index.scss";

const Header = props => {
  const { artist, albums } = props;

  const songsCount = albums.reduce((accumulator, album) => {
    return accumulator + album.songs.length;
  }, 0);

  return(
    <header className="artist-header">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-2">
            <ArtistImage images={artist.images} />
          </div>
          <div className="col-12 col-md-10">
            <h2>{artist.name}</h2>
            <p><button onClick={e => alert("aún no...")}>Dale play a todo</button></p>
            <p>{albums.length} álbums ({songsCount} canciones) disponibles</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;