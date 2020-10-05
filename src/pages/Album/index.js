import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import SongsService from "../../shared/songs-service";
import withQueueContext from "../../hoc/queue";

import "./index.scss";

class Album extends Component {
  constructor(props) {
    super(props);

    this.albumId = this.props.match.params.albumId;
    this.state = {
      songs: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    SongsService.listByAlbum(this.albumId).then((songs) => {
      this.setState({
        songs: songs,
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
        {this.state.songs[0] && (
          <img
            src={`https://picsum.photos/seed/${this.state.songs[0].album.title}/1000/1000`}
            className="album-cover"
            alt=""
          />
        )}

        <div className="container">
          <p>El listado de canciones</p>

          {this.state.loading && <p>Cargando...</p>}

          {this.state.songs.length > 0 && (
            <>
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

              <button onClick={this.replaceQueueAndPlay}>Reproducir</button>
              <button onClick={this.appendAlbumToQueue}>
                Agregar a la cola
              </button>
              <Link to={`/album/${this.albumId}/edit`}>Editar el álbum</Link>
            </>
          )}

          {!this.state.loading && this.state.songs.length <= 0 && (
            <p>No se han encontrado canciones</p>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(withQueueContext(Album));
