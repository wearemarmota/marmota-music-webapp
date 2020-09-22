import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import "./index.scss";

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  Link = () => (
    <Link to={`/album/${this.props.album.id}`}>{this.props.album.title}</Link>
  );

  Button = () => (
    <button onClick={this.props.onClick}>{this.props.album.title}</button>
  );

  render() {
    return (
      <article className="album">
        <main>{this.props.onClick ? <this.Button /> : <this.Link />}</main>
      </article>
    );
  }
}

export default withRouter(Album);
