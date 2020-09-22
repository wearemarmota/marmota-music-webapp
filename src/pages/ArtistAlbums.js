import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import AlbumsService from "./../shared/albums-service";
import ArtistsService from "./../shared/artists-service";

import AlbumsList from "../components/AlbumsList";

class Albums extends Component {
  constructor(props) {
    super(props);

    this.artistId = this.props.match.params.artistId;
    this.state = {
      albums: [],
      loading: false,
      artist: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    AlbumsService.listByArtist(this.artistId).then((albums) => {
      this.setState({
        albums: albums,
        loading: false,
      });
    });

    ArtistsService.get(this.artistId).then((artist) => {
      this.setState({
        artist: artist,
      });
    });
  }

  render() {
    return (
      <div className="container">
      {this.state.loading && <p>Cargando...</p>}

        {this.state.artist && <h2>Albums de {this.state.artist.name}</h2>}

        {this.state.albums.length > 0 && (
          <AlbumsList albums={this.state.albums} />
        )}

        {!this.state.loading && this.state.albums.length <= 0 && (
          <p>No se han encontrado álbums</p>
        )}
      </div>
    );
  }
}

export default withRouter(Albums);
