import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import sortBy from "lodash/sortBy";
import AlbumsService from "../../shared/albums-service";
import withQueueContext from "../../hoc/queue";

import Cover from "./Cover";

import "./index.scss";

class AlbumItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      loadingAlbum: false,
    }
  }

  playAlbum = e => {
    if(this.state.loadingAlbum){
      return;
    }
    this.setState({ loadingAlbum: true });
    AlbumsService.get(this.props.album.id).then((album) => {
      this.setState({ loadingAlbum: false });
      this.replaceQueueAndPlay(album);
    });
  }

  replaceQueueAndPlay = album => {
    const {
      setSongs,
      setCurrentIndex,
      setPlaying,
    } = this.props.queueContext;

    // Build an array of songs, each one with the album info
    // but removing the songs array of him.
    let songsToAppend = sortBy(album.songs, [function(o){ return o.position; }]);

    songsToAppend.forEach(song => {
      song.album = Object.assign({}, album);
      delete song.album.songs;
    });

    setSongs(songsToAppend).then(() => {
      setCurrentIndex(0).then(() => {
        setPlaying(false).then(setPlaying(true));
      });
    });
  }

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
          <button className="play unstyled" onClick={e => this.playAlbum("jajaxdlol")}>
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
          </button>
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

export default withRouter(withQueueContext(AlbumItem));
