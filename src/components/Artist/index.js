import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import "./index.scss";

class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <article className="artist">
        <Link to={`/artist/${this.props.artist.id}`}>
          <span>{this.props.artist.name}</span>
        </Link>
      </article>
    );
  }
}

export default withRouter(Artist);
