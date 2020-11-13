import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import AlbumsService from "../../shared/albums-service";
import ArtistsService from "../../shared/artists-service";

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

    this.setState({
      loadingAlbums: true,
      loadingArtist: true,
    });

    AlbumsService.listByArtist(this.artistId).then((albums) => {
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
      <div className="container">
        { loadingArtist && <h2>Cargando...</h2> }
        { artist && <h2>Albums de {artist.name}</h2> }
        { loadingAlbums && <AlbumsListPhantom amount={6} /> }
        { albums.length > 0 && <AlbumsList albums={albums} /> }
        { !loadingAlbums && albums.length <= 0 && (
          <p>No se han encontrado álbums</p>
        )}
      </div>
    );
  }
}

export default withRouter(Artist);
