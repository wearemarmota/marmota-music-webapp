import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import sortBy from "lodash/sortBy";
import get from "lodash/get";

import AlbumsService from "../../shared/albums-service";
import withQueueContext from "../../hoc/queue";
import { createSongsListItem } from "../../shared/factories";

import Cover from "../../components/AlbumItem/Cover";
import Header from "./Header";
import SongsList from "../../components/SongsList";
import EmptyAlbum from "./EmptyAlbum";

import "./index.scss";

class AlbumDetail extends Component {
  constructor(props) {
    super(props);
    this.albumId = get(this.props, "match.params.albumId", null);
    this.state = {
      album: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps){
    const oldAlbumId = get(prevProps, "match.params.albumId", null);
    const newAlbumId = get(this.props, "match.params.albumId", null);
    if(oldAlbumId !== newAlbumId){
      this.albumId = newAlbumId;
      this.loadData();
    }
  }

  loadData = () => {
    this.setState({ loading: true });
    AlbumsService.get(this.albumId).then((album) => {
      this.setState({
        album: album,
        album: {
          ...album,
          songs: album.songs.map(song => {
            return createSongsListItem({
              song: song,
              album: album,
              artist: album.artist,
            })
          })
        },
        loading: false,
      })
    });
  }

  // Sort the songs list by his position on the album
  // (in case that api doesn't return it in correct order)
  orderedSongs = () => sortBy(this.state.album.songs, [function(o){ return o.position; }]);

  replaceQueueAndPlay = (index = 0) => {
    const {
      setSongs,
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
      setCurrentIndex(index).then(() => {
        setPlaying(false).then(setPlaying(true));
      });
    });
  };

  appendAlbumToQueue = () => {
    const { songs, setSongs } = this.props.queueContext;
    let songsToAppend = this.orderedSongs();

    // Build an array of songs, each one with the album info
    // but removing the songs array of him.
    songsToAppend.forEach(song => {
      song.album = Object.assign({}, this.state.album);
      delete song.album.songs;
    });

    setSongs([].concat(songs, songsToAppend));
  };

  appendSongToQueue = (song) => {
    const { songs, setSongs } = this.props.queueContext;

    // Include the album info to the song object (excluding songs list)
    song.album = Object.assign({}, this.state.album);
    delete song.album.songs;

    setSongs([].concat(songs, [song]));
  };

  playSong = index => this.replaceQueueAndPlay(index);

  render() {

    if(this.state.loading){
      return <div className="container small">
        <Header isPhantom />
      </div>;
    }

    if(!this.state.loading && !this.state.album){
      return <div className="container small">
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

        <div className="container small">

          <Header
            album={this.state.album}
            play={e => this.replaceQueueAndPlay(0)}
            appendAlbumToQueue={this.appendAlbumToQueue}
          />

          { this.state.album.songs.length <= 0 && 
            <EmptyAlbum />
          }

          { this.state.album.songs.length > 0 && (
            <SongsList songs={this.orderedSongs()} />
          )}

        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withQueueContext(AlbumDetail));
