import React from "react";
import { withRouter, Link } from "react-router-dom";

import ArtistImage from "./Image"

import "./index.scss";

const ArtistItem = props => {
  const { artist } = props;
  return(
    <article className="artist">
      <Link to={`/artist/${artist.id}`}>
        <ArtistImage images={artist.images} name={artist.name} />
      </Link>
      <div className="name">
        <Link to={`/artist/${artist.id}`} title={artist.name}>
          {artist.name}
        </Link>
      </div>
    </article>
  );
}

export default withRouter(ArtistItem);
