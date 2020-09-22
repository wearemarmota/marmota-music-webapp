import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import AlbumsService from "./../shared/albums-service";

import AlbumsList from "../components/AlbumsList";

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    AlbumsService.list().then((albums) => {
      this.setState({
        albums: albums,
        loading: false,
      });
    });
  }

  render() {
    return (
      <div className="container">
        <h2>Todos los álbums</h2>
        {this.state.loading && <p>Cargando...</p>}
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
