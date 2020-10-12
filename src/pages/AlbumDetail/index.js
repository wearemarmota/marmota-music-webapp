import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AlbumsService from "../../shared/albums-service";
import withQueueContext from "../../hoc/queue";

import Cover from "../../components/AlbumItem/Cover";
import Duration from "../../components/Duration";

import "./index.scss";

class AlbumDetail extends Component {
  constructor(props) {
    super(props);

    this.albumId = this.props.match.params.albumId;
    this.state = {
      album: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    AlbumsService.get(this.albumId).then((album) => {
      this.setState({
        album: album,
        loading: false,
      })
    })
  }

  replaceQueueAndPlay = () => {
    const {
      setSongs,
      setVisible,
      setCurrentIndex,
      setPlaying,
    } = this.props.queueContext;

    // Build an array of songs, each one with the album info
    // but removing the songs array of him.
    let songsToAppend = this.state.album.songs;
    songsToAppend.forEach(song => {
      song.album = Object.assign({}, this.state.album);
      delete song.album.songs;
    });

    setSongs(songsToAppend).then(() => {
      setVisible(true);
      setCurrentIndex(0).then(() => {
        setPlaying(false).then(setPlaying(true));
      });
    });
  };

  appendAlbumToQueue = () => {
    const { songs, setSongs, setVisible } = this.props.queueContext;
    let songsToAppend = this.state.album.songs;

    // Build an array of songs, each one with the album info
    // but removing the songs array of him.
    songsToAppend.forEach(song => {
      song.album = Object.assign({}, this.state.album);
      delete song.album.songs;
    });

    setSongs([].concat(songs, songsToAppend));
    setVisible(true);
  };

  appendSongToQueue = (song) => {
    const { songs, setSongs, setVisible } = this.props.queueContext;

    // Include the album info to the song object (excluding songs list)
    song.album = Object.assign({}, this.state.album);
    delete song.album.songs;

    setSongs([].concat(songs, [song]));
    setVisible(true);
  };

  render() {

    if(this.state.loading){
      return <div className="container">
        <p>Cargando...</p>
      </div>;
    }

    if(!this.state.loading && !this.state.album){
      return <div className="container">
        <p>Mmm...</p>
      </div>;
    }

    return (
      <React.Fragment>
        <Cover
          covers={this.state.album.covers}
          className="background-cover"
          alt={this.state.album.title + " cover"}
        />

        <div className="container">

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

          { this.state.album.songs.length <= 0 && 
            <EmptyAlbum />
          }

          { this.state.album.songs.length > 0 && (
            <table width="100%">
              <tbody>
                {this.state.album.songs.map((song, index) => {
                  return (
                    <tr key={index}>
                      <td>{song.position}</td>
                      <td>{song.title}</td>
                      <td>
                        <button onClick={() => { this.appendSongToQueue(song); }}>
                          Añadir a la cola
                        </button>
                      </td>
                      <td>
                          <Duration seconds={song.duration} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </React.Fragment>
    );
  }
}

function EmptyAlbum(props){
  return <React.Fragment>
    <h2>Uis...</h2>
    <p>
      Parece que este disco no tiene canciones.{" "}
      <Link to="/upload">Súbelas</Link>
    </p>
  </React.Fragment>;
}

export default withRouter(withQueueContext(AlbumDetail));
