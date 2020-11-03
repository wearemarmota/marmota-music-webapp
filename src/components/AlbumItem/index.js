import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import Cover from "./Cover";

import "./index.scss";

class AlbumItem extends Component {
  render() {
    const ClickReceiver =
      this.props.onClick !== undefined ? AlbumButton : AlbumLink;
    const album = this.props.album;
    const artist = album.artist;

    return (
      <article className="album">
        <div className="cover">
          <ClickReceiver {...this.props}>
            <Cover
              covers={album.covers}
              title={album.title}
              alt={`${album.title} cover`}
            />
            {this.props.showGlow && (
              <Cover covers={album.covers} className="cover-component-glow" alt="cover" />
            )}
          </ClickReceiver>
        </div>
        {this.props.showTitle && (
          <h1 className="title">
            <Link to={`/album/${album.id}`}>{album.title}</Link>
          </h1>
        )}
        {this.props.showArtist && (
          <div className="artist">
            <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
          </div>
        )}
      </article>
    );
  }

  static defaultProps = {
    showGlow: true,
    showTitle: true,
    showArtist: true,
  };
}

function AlbumLink(props) {
  return <Link to={`/album/${props.album.id}`}>{props.children}</Link>;
}

function AlbumButton(props) {
  return (
    <button className="unstyled" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default withRouter(AlbumItem);
