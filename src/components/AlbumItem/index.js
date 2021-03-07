import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import sortBy from "lodash/sortBy";
import AlbumsService from "../../shared/albums-service";
import withQueueContext from "../../hoc/queue";
import { setSearchTerm } from "../../redux/actions/search";

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

  clearSearchTerm = () => this.props.setSearchTerm("");

  render() {
    const album = this.props.album;
    const artist = album.artist;

    return (
      <article className="album">
        <div className="cover">
          <Link to={`/album/${this.props.album.id}`} onClick={this.clearSearchTerm}>
            <Cover
              covers={album.covers}
              title={album.title}
              alt={`${album.title} cover`}
            />
            {this.props.showGlow && (
              <Cover covers={album.covers} className="cover-component-glow" alt="cover" />
            )}
          </Link>
          <button className="play unstyled" onClick={this.playAlbum} aria-label={`Play ${album.title} album`}>
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
          </button>
        </div>
        {this.props.showTitle && (
          <h1 className="title">
            <Link to={`/album/${album.id}`} onClick={this.clearSearchTerm}>{album.title}</Link>
          </h1>
        )}
        {this.props.showArtist && (
          <div className="artist">
            <Link to={`/artist/${artist.id}`} onClick={this.clearSearchTerm}>{artist.name}</Link>
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

const mapDispatchToProps = {
  setSearchTerm,
}

export default compose(
  connect(null, mapDispatchToProps),
  withRouter,
  withQueueContext,
)(AlbumItem);