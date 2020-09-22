import React, { Component } from "react";

import ArtistsService from "../shared/artists-service";
import AlbumsService from "../shared/albums-service";

import AlbumsList from "../components/AlbumsList";
import ArtistsList from "../components/ArtistsList";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      albums: [],
      loadingArtists: false,
      loadingAlbums: false,
    };
  }

  componentDidMount() {
    this.setState({ loadingArtists: true, loadingAlbums: true });

    ArtistsService.list().then((artists) => {
      this.setState({
        artists: artists,
        loadingArtists: false,
      });
    });

    AlbumsService.list().then((albums) => {
      this.setState({
        albums: albums,
        loadingAlbums: false,
      });
    });
  }

  render() {
    return (
      <>
        <img
          src="img/main-img.png"
          style={{ marginTop: "-80px", width: "100%" }}
        />

        <div className="container" style={{marginTop: "-20vw"}}>
          {/* Some artists */}

          <h2>Artistas</h2>
          {this.state.loadingArtists && <p>Cargando...</p>}
          {this.state.artists.length > 0 && (
            <ArtistsList artists={this.state.artists} />
          )}
          {!this.state.loadingArtists && this.state.artists.length <= 0 && (
            <p>No se han encontrado artistas</p>
          )}

          {/* Some albums */}
          <h2>Todos los álbums</h2>
          {this.state.loadingAlbums && <p>Cargando...</p>}
          {this.state.albums.length > 0 && (
            <AlbumsList albums={this.state.albums} />
          )}
          {!this.state.loadingAlbums && this.state.albums.length <= 0 && (
            <p>No se han encontrado álbums</p>
          )}
        </div>
      </>
    );
  }
}

export default Home;
