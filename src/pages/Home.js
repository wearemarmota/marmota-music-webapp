import React, { Component } from "react";

import ArtistsService from "../shared/artists-service";
import AlbumsService from "../shared/albums-service";

import AlbumsList from "../components/AlbumsList";
import AlbumsListPhantom from "../components/AlbumsList/Phantom";
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

    AlbumsService.list({
      sortBy: 'created_at',
      orderBy: 'desc',
    }).then((albums) => {
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
          style={{ marginTop: "-80px", width: "100%", height: "auto" }}
          alt=""
          width="1440px"
          height="569px"
        />

        <div className="container" style={{ marginTop: "-20vw" }}>
          {/* Some albums */}
          <h2>Últimos álbums</h2>
          {this.state.loadingAlbums && <AlbumsListPhantom amount={6} /> }
          {this.state.albums.length > 0 && (
            <AlbumsList albums={this.state.albums.slice(0, 6)} />
          )}
          
          {!this.state.loadingAlbums && this.state.albums.length <= 0 && (
            <p>No se han encontrado álbums</p>
          )}

          {/* Some artists */}

          <h2>Artistas destacados</h2>
          {this.state.loadingArtists && <p>Cargando...</p>}
          {this.state.artists.length > 0 && (
            <ArtistsList artists={this.state.artists.slice(0, 6)} />
          )}
          {!this.state.loadingArtists && this.state.artists.length <= 0 && (
            <p>No se han encontrado artistas</p>
          )}

          {/* Random albums */}
          <h2>Álbums aleatorios</h2>
          {this.state.loadingAlbums && <p>Cargando...</p>}
          {this.state.albums.length > 0 && (
            <AlbumsList albums={this.state.albums.slice(0, 6)} />
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
