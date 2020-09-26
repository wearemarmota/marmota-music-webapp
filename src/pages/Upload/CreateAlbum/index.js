import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import debounce from "lodash/debounce";
import AlbumsService from "../../../shared/albums-service";

import Album from "../../../components/Album";

import "./index.scss";

class CreateAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      loading: false,
      album: null,
      previousAlbums: [],
    };
  }

  componentDidMount = () => {
    AlbumsService.listByArtist(this.props.artist.id).then((albums) => {
      this.setState({ previousAlbums: albums });
    });
  };

  isButtonDisabled = () => {
    if (this.state.title === "") {
      return true;
    }

    if (this.state.loading) {
      return true;
    }

    return false;
  };

  onChange = (e) => {
    this.setState({ title: e.target.value, loading: true, album: null }, () =>
      this.searchAlbumDebounced()
    );
  };

  searchAlbum = () => {
    AlbumsService.findByArtist(
      this.props.artist.id,
      this.state.title,
      true
    ).then((albums) => {
      this.setState({
        album: albums[0] || null,
        loading: false,
      });
    });
  };

  searchAlbumDebounced = debounce(() => {
    this.searchAlbum();
  }, 400);

  continue = () => {
    if (this.state.album) {
      this.props.setAlbum(this.state.album);
      this.props.next();
    } else {
      this.setState({ loading: true });
      AlbumsService.create(this.state.title, this.props.artist.id)
        .then((album) => {
          this.setState({
            album: album,
            loading: false,
          });
          this.props.setAlbum(album);
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
    e.preventDefault();
    this.continue();
  };

  render() {
    return (
      <aside className="create-album">
        <h3>Seleccionar o crear album de {this.props.artist.name}</h3>

        {this.props.currentStep === 2 && (
          <form onSubmit={this.submit}>
            <p>Seleccionar album ya creado:</p>
            {this.state.previousAlbums.length > 0 && (
              <div className="row">
                {this.state.previousAlbums.map((album, index) => {
                  return (
                    <div
                      className="col-4 col-md-3 col-lg-2 col-xl-2"
                      key={index}
                    >
                      <Album
                        showArtist={false}
                        showGlow={false}
                        album={album}
                        onClick={() => {
                          this.setState({ album: album }, () => {
                            this.continue();
                          });
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            <hr />
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
            />
            <button disabled={this.isButtonDisabled()}>
              {this.state.loading && "Cargando..."}
              {!this.state.loading &&
                (this.state.album ? "Usar" : "Crear") + " " + this.state.title}
            </button>
            <hr />
            <button onClick={this.props.prev}>Cambiar artista</button>
          </form>
        )}

        {this.props.currentStep > 2 && (
          <p>Album: {this.state.album && this.state.album.title}</p>
        )}
      </aside>
    );
  }

  static defaultProps = {
    currentStep: 1,
    artist: null,
    next: () => {},
    prev: () => {},
    setAlbum: () => {},
  };
}

export default withRouter(CreateAlbum);
