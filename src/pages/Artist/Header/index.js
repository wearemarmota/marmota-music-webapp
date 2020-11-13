import React, { Component } from "react";
import ArtistImage from "../../../components/ArtistItem/Image"

import "./index.scss";

const Header = props => {
  const { artist, albumsCount } = props;
  return(
    <header className="artist-header">
      <div className="container">
        <div class="row">
          <div class="col-12 col-md-2">
            <ArtistImage images={artist.images} />
          </div>
          <div class="col-12 col-md-10">
            <h2>{artist.name}</h2>
            <p>{albumsCount} álbums disponibles</p>
            <p><button onClick={e => alert("aún no...")}>Dale play a todo</button></p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;