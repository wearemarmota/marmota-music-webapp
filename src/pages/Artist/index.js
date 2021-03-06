import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import get from "lodash/get";

import AlbumsService from "../../shared/albums-service";
import ArtistsService from "../../shared/artists-service";

import Header from "./Header";
import AlbumsList from "../../components/AlbumsList";
import AlbumsListPhantom from "../../components/AlbumsList/Phantom";

class Artist extends Component {
  constructor(props) {
    super(props);

    this.artistId = this.props.match.params.artistId;
    this.state = {
      albums: [],
      loadingAlbums: false,
      loadingArtist: false,
      artist: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps){
    const oldArtistId = get(prevProps, "match.params.artistId", null);
    const newArtistId = get(this.props, "match.params.artistId", null)
    if(oldArtistId !== newArtistId){
      this.artistId = newArtistId;
      this.loadData();
    }
  }

  loadData = () => {
    this.setState({
      albums: [],
      loadingAlbums: true,
      loadingArtist: true,
      artist: null,
    });

    AlbumsService.listByArtist(this.artistId, {withSongs: 1}).then((albums) => {
      this.setState({
        albums: albums,
        loadingAlbums: false,
      });
    });

    ArtistsService.get(this.artistId).then((artist) => {
      this.setState({
        artist: artist,
        loadingArtist: false,
      });
    });
  }

  render() {

    const {
      loadingAlbums,
      loadingArtist,
      artist,
      albums
    } = this.state;

    return (
      <>
      { artist && <Header artist={this.state.artist} albums={albums} /> }
      <div className="container">
        { loadingArtist && <h2>Cargando...</h2> }
        { loadingAlbums && <AlbumsListPhantom amount={6} /> }
        { albums.length > 0 && <AlbumsList albums={albums} /> }
        { !loadingAlbums && albums.length <= 0 && (
          <p>No se han encontrado álbums</p>
        )}
      </div>
      </>
    );
  }
}

export default withRouter(Artist);
