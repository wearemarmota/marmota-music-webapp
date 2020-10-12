import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import DefaultImage from "./DefaultImage";

import "./index.scss";

class ArtistItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { artist } = this.props;
    return (
      <article className="artist">
        <Link to={`/artist/${artist.id}`}>
          <DefaultImage name={artist.name} />
        </Link>
        <div className="name">
          <Link to={`/artist/${artist.id}`} title={artist.name}>
            {artist.name}
          </Link>
        </div>
      </article>
    );
  }
}

export default withRouter(ArtistItem);
