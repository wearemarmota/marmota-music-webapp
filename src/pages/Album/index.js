import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import SongsService from "../../shared/songs-service";
import withQueueContext from "../../hoc/queue";

import Cover from "../../components/Album/Cover";

import "./index.scss";

class Album extends Component {
  constructor(props) {
    super(props);

    this.albumId = this.props.match.params.albumId;
    this.state = {
      songs: [],
      album: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    SongsService.listByAlbum(this.albumId).then((songs) => {
      this.setState({
        songs: songs,
        album: (songs[0] && songs[0].album) || null,
        loading: false,
      });
    });
  }

  replaceQueueAndPlay = () => {
    const {
      setSongs,
      setVisible,
      setCurrentIndex,
      setPlaying,
    } = this.props.queueContext;
    setSongs(this.state.songs).then(() => {
      setVisible(true);
      setCurrentIndex(0).then(() => {
        setPlaying(false).then(setPlaying(true));
      });
    });
  };

  appendAlbumToQueue = () => {
    const { songs, setSongs, setVisible } = this.props.queueContext;
    setSongs([].concat(songs, this.state.songs));
    setVisible(true);
  };

  appendSongToQueue = (song) => {
    const { songs, setSongs, setVisible } = this.props.queueContext;
    setSongs([].concat(songs, [song]));
    setVisible(true);
  };

  render() {
    return (
      <>
        {this.state.album && (
          <Cover
            covers={this.state.album.covers}
            className="background-cover"
            alt=""
            size="original"
          />
        )}

        <div className="container">
          {this.state.loading && <p>Cargando...</p>}

          {!this.state.loading && this.state.songs.length <= 0 && (
            <>
              <h2>Uis...</h2>
              <p>
                Parece que este disco no tiene canciones.{" "}
                <Link to="/upload">Súbelas</Link>
              </p>
            </>
          )}

          {this.state.songs.length > 0 && (
            <>
              <header className="album-header">
                <Cover
                  covers={this.state.album.covers}
                  className="main-cover"
                  alt={this.state.album.title + " cover"}
                />
                <div className="details">
                  <h2>{this.state.album.title}</h2>
                  <p>{this.state.album.artist.name}</p>

                  <div>
                    <button className="link" onClick={this.replaceQueueAndPlay}>
                      Reproducir
                    </button>
                    <button className="link" onClick={this.appendAlbumToQueue}>
                      Agregar a la cola
                    </button>
                  </div>
                  <div>
                    <Link to={`/album/${this.albumId}/edit`}>
                      Editar el álbum
                    </Link>
                  </div>
                </div>
              </header>

              <h2>Las canciones de {this.state.album.title}</h2>

              <table width="100%">
                <tbody>
                  {this.state.songs.map((song, index) => {
                    return (
                      <tr key={index}>
                        <td>{song.position}</td>
                        <td>{song.title}</td>
                        <td>
                          <button
                            onClick={() => {
                              this.appendSongToQueue(song);
                            }}
                          >
                            Añadir a la cola
                          </button>
                        </td>
                        <td>
                          {new Date(song.duration * 1000)
                            .toISOString()
                            .substr(14, 5)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(withQueueContext(Album));
