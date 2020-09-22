import React, { Component } from "react";

import ArtistsService from "../shared/artists-service";

import ArtistsList from "../components/ArtistsList";

class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    ArtistsService.list().then((artists) => {
      this.setState({
        artists: artists,
        loading: false,
      });
    });
  }

  render() {
    return (
      <div className="container">
        <h2>Artistas</h2>

        {this.state.loading && <p>Cargando...</p>}

        {this.state.artists.length > 0 && (
          <ArtistsList artists={this.state.artists} />
        )}

        {!this.state.loading && this.state.artists.length <= 0 && (
          <p>No se han encontrado artistas</p>
        )}
      </div>
    );
  }
}

export default Artists;
