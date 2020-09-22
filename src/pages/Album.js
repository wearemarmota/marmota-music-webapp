import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SongsService from "../shared/songs-service";

import QueueContext from "../QueueContext";

class Album extends Component {
  static contextType = QueueContext;

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

  addAllToQueue = () => {
    const { setSongs, setVisible } = this.context;
    setSongs(this.state.songs);
    setVisible(true);
  };

  appendToQueue = () => {
    const { songs, setSongs, setVisible } = this.context;
    setSongs([].concat(songs, this.state.songs));
    setVisible(true);
  };

  render() {
    return (
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
                      <td>{song.title}</td>
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

            <button onClick={this.addAllToQueue}>Reproducir</button>
            <button onClick={this.appendToQueue}>Agregar a la cola</button>
          </>
        )}

        {!this.state.loading && this.state.songs.length <= 0 && (
          <p>No se han encontrado canciones</p>
        )}
      </div>
    );
  }
}

export default withRouter(Album);
