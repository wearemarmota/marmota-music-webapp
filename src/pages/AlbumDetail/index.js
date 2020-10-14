import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import sortBy from "lodash/sortBy";
import AlbumsService from "../../shared/albums-service";
import withQueueContext from "../../hoc/queue";

import Cover from "../../components/AlbumItem/Cover";
import Header from "./Header";

import "./index.scss";
import List from "./List";
import EmptyAlbum from "./EmptyAlbum";

class AlbumDetail extends Component {
  constructor(props) {
    super(props);

    this.albumId = this.props.match.params.albumId;
    this.state = {
      album: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    AlbumsService.get(this.albumId).then((album) => {
      this.setState({
        album: album,
        loading: false,
      })
    })
  }

  // Sort the songs list by his position on the album
  // (in case that api doesn't return it in correct order)
  orderedSongs = () => sortBy(this.state.album.songs, [function(o){ return o.position; }]);

  replaceQueueAndPlay = () => {
    const {
      setSongs,
      setVisible,
      setCurrentIndex,
      setPlaying,
    } = this.props.queueContext;

    // Build an array of songs, each one with the album info
    // but removing the songs array of him.
    let songsToAppend = this.orderedSongs();
    songsToAppend.forEach(song => {
      song.album = Object.assign({}, this.state.album);
      delete song.album.songs;
    });

    setSongs(songsToAppend).then(() => {
      setVisible(true);
      setCurrentIndex(0).then(() => {
        setPlaying(false).then(setPlaying(true));
      });
    });
  };

  appendAlbumToQueue = () => {
    const { songs, setSongs, setVisible } = this.props.queueContext;
    let songsToAppend = this.orderedSongs();

    // Build an array of songs, each one with the album info
    // but removing the songs array of him.
    songsToAppend.forEach(song => {
      song.album = Object.assign({}, this.state.album);
      delete song.album.songs;
    });

    setSongs([].concat(songs, songsToAppend));
    setVisible(true);
  };

  appendSongToQueue = (song) => {
    const { songs, setSongs, setVisible } = this.props.queueContext;

    // Include the album info to the song object (excluding songs list)
    song.album = Object.assign({}, this.state.album);
    delete song.album.songs;

    setSongs([].concat(songs, [song]));
    setVisible(true);
  };

  render() {

    if(this.state.loading){
      return <div className="container">
        <p>Cargando...</p>
      </div>;
    }

    if(!this.state.loading && !this.state.album){
      return <div className="container">
        <p>Mmm...</p>
      </div>;
    }
    
    return (
      <React.Fragment>
        <Cover
          covers={this.state.album.covers}
          className="background-cover"
          alt={this.state.album.title + " cover"}
        />

        <div className="container">

          <Header
            album={this.state.album}
            play={this.replaceQueueAndPlay}
            append={this.appendAlbumToQueue}
          />

          { this.state.album.songs.length <= 0 && 
            <EmptyAlbum />
          }

          { this.state.album.songs.length > 0 && (
            <List
              album={this.state.album}
              songs={this.orderedSongs()}
              currentSong={this.props.queueContext.getCurrentSong()}
            />
          )}
          
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withQueueContext(AlbumDetail));
