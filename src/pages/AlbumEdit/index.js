import React, { Component } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";

import AlbumsService from "../../shared/albums-service";
import SongsService from "../../shared/songs-service";
import Logger from "../../shared/logger";

import "./index.scss";
import Cover from "../../components/AlbumItem/Cover";
import Duration from "../../components/Duration";

class AlbumEdit extends Component {
  constructor(props) {
    super(props);

    this.albumId = this.props.match.params.albumId;
    this.state = {
      album: null,
      albumTitle: "",
    };
  }

  componentDidMount() {
    this.logger = new Logger("AlbumEdit");
    this.loadAlbum();
  }

  loadAlbum = () => {
    this.logger.log("loadAlbum");
    AlbumsService.get(this.albumId).then((album) => {
      this.logger.log(album);
      this.setState({
        album: album,
        albumTitle: album.title,
      });
    });
  }

  handleChangeCover = (e) => {
    this.logger.log("handleChangeCover");
    const file = e.target.files[0] || null;
    if (!file) {
      this.logger.warn("Invalid file");
      return;
    }

    AlbumsService.updateCover(this.albumId, file)
      .then((result) => {
        this.logger.log("updateCover then", result);
      })
      .catch((error) => {
        // ToDo: To this well
        this.logger.error(error);
      });

    e.preventDefault();
  };

  handleAlbumTitleChange = (e) => {
    this.logger.log("handleAlbumTitleChange");
    this.setState({
      albumTitle: e.target.value,
    });
    this.updateAlbumTitleDebounced();
  }

  handleSongTitleChange = (e, index) => {
    this.logger.log("handleSongTitleChange");
    const newValue = e.target.value;
    this.setState((prevState) => {
      prevState.album.songs[index].title = newValue;
      return prevState;
    }, () => {
      this.updateSongTitleDebounced(index);
    })
  }

  updateAlbumTitle = () => {
    this.logger.log("updateAlbumTitle");
    AlbumsService.update(this.state.album.id, this.state.albumTitle).then((result) => {
      this.logger.log(result);
    });
  }

  updateAlbumTitleDebounced = debounce(this.updateAlbumTitle, 1000);

  updateSongTitle = (index) => {
    this.logger.log("updateSongTitle");
    const song = this.state.album.songs[index];
    SongsService.update(song.id, song.title).then((result) => {
      this.logger.log(result);
    });
  }

  updateSongTitleDebounced = debounce((index) => {
    this.updateSongTitle(index)
  }, 1000);

  remove = (index) => {
    const song = this.state.album.songs[index];
    
    this.logger.log("removing...", song);

    if(!window.confirm(`¿Seguro que quieres eliminar ${song.title}? Es irreversible`)){
      this.logger.log("removing action not confirmed");
      return;
    }

    SongsService.remove(song.id).then((response) => {
      this.logger.log("removed", response);
      this.loadAlbum();
    });
  }

  render() {
    if(!this.state.album){
      return <div className="container"><p>Loading...</p></div>
    }
    return (
      <div className="container">
        <h2>Editar el álbum</h2>
        <form>
          <div>
            <Cover covers={this.state.album.covers} />
            <input
              type="file"
              name="cover"
              accept="image/png, image/jpeg"
              onChange={this.handleChangeCover}
            />
          </div>
          <div>
            <input
              type="text"
              value={this.state.albumTitle}
              onChange={this.handleAlbumTitleChange}
            />
          </div>
        </form>
        <Link to={`/album/${this.albumId}`}>Volver al álbum</Link>

        <h2>Las canciones de {this.state.album.title}</h2>

        <table width="100%">
          <tbody>
            {this.state.album.songs.map((song, index) => {
              return (
                <tr key={index}>
                  <td>{song.position}</td>
                  <td><input type="text" value={song.title} onChange={(e) => {this.handleSongTitleChange(e, index)}}/></td>
                  <td>
                    <button onClick={() => {this.remove(index)}}>Eliminar</button>
                  </td>
                  <td>
                    <Duration seconds={song.duration} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2>Subir canciones a {this.state.album.title}</h2>

        <Link to="/upload">Ir al cargador de canciones</Link>

      </div>
    );
  }
}

export default AlbumEdit;