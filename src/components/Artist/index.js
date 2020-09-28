import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import "./index.scss";

class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { artist } = this.props;
    return (
      <article className="artist">
        <Link to={`/artist/${artist.id}`}>
          <img src={`https://picsum.photos/seed/${artist.name}/500/500`} alt={artist.name} />
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

export default withRouter(Artist);
