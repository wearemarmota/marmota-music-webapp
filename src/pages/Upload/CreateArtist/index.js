import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { debounce } from "lodash";
import ArtistsService from "../../../shared/artists-service";

import "./index.scss";

class CreateArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loading: false,
      artist: null,
    };
  }

  isButtonDisabled = () => {
    if (this.state.name === "") {
      return true;
    }

    if (this.state.loading) {
      return true;
    }

    return false;
  };

  onChange = (e) => {
    this.setState({ name: e.target.value, loading: true, artist: null }, () =>
      this.searchArtistDebounced()
    );
  };

  searchArtist = () => {
    ArtistsService.find(this.state.name, true).then((artists) => {
      this.setState({
        artist: artists[0] || null,
        loading: false,
      });
    });
  };

  searchArtistDebounced = debounce(() => {
    this.searchArtist();
  }, 400);

  continue = () => {
    if (this.state.artist) {
      this.props.setArtist(this.state.artist);
      this.props.next();
    } else {
      this.setState({ loading: true });
      ArtistsService.create(this.state.name)
        .then((artist) => {
          this.setState({
            artist: artist,
            loading: false,
          });
          this.props.setArtist(artist);
          this.props.next();
        })
        .catch((error) => {
          // ToDo: Improve this error management.
          console.error(error);
          alert(error.data.error.name[0]);
        });
    }
  };

  submit = (e) => {
    // This submit method isn't really required.
    // is used only to maintain homogeneity
    // with <CreateAlbum />
    e.preventDefault();
    this.continue();
  };

  render() {
    return (
      <aside className="create-artist">
        <h3>Seleccionar o crear artista</h3>
        {this.props.currentStep === 1 && (
          <form onSubmit={this.submit}>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
            <button disabled={this.isButtonDisabled()}>
              {this.state.loading && "Cargando..."}
              {!this.state.loading &&
                (this.state.artist ? "Usar" : "Crear") + " " + this.state.name}
            </button>
          </form>
        )}

        {this.props.currentStep > 1 && (
          <p>Artista: {this.state.artist && this.state.artist.name}</p>
        )}
      </aside>
    );
  }

  static defaultProps = {
    currentStep: 1,
    next: () => {},
    setArtist: () => {},
  };
}

export default withRouter(CreateArtist);
