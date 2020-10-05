import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import "./index.scss";

class Album extends Component {
  render() {
    const ClickReceiver =
      this.props.onClick !== undefined ? AlbumButton : AlbumLink;
    const album = this.props.album;
    const artist = album.artist;

    return (
      <article className="album">
        <div className="cover">
          <ClickReceiver {...this.props}>
            <CoverImage
              covers={album.coverFiles}
              title={album.title}
              className="cover"
              alt="cover"
            />
            {this.props.showGlow && (
              <CoverImage
                covers={album.coverFiles}
                className="glow"
                alt="cover"
              />
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

function CoverImage(props) {
  const { covers, className, alt, title } = props;
  if (covers.hasOwnProperty("500")) {
    return <img src={covers["500"]} className={className} alt={alt} />;
  }
  return <SVGCover className={className} alt={alt} title={title} />;
}

function SVGCover(props) {
  const { className, title } = props;
  return (
    <svg
      className={className}
      width="364"
      height="364"
      viewBox="0 0 364 364"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect
          id="svg_1"
          height="364"
          width="364"
          y="0.5"
          x="0"
          fill="#d8138a"
        />

        <rect
          id="svg_2"
          height="300"
          width="300"
          y="32"
          x="32"
          fill="#b1086e"
        />

        <text
          stroke="#000"
          font-weight="bold"
          xmlSpace="preserve"
          textAnchor="middle"
          fontSize="32"
          id="svg_3"
          dominant-baseline="middle"
          y="50%"
          x="50%"
          fillOpacity="null"
          strokeOpacity="null"
          strokeWidth="0"
          fill="white"
        >
          {title}
        </text>
      </g>
    </svg>
  );
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

export default withRouter(Album);
