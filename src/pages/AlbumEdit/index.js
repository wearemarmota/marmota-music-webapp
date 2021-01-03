import React, { Component } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";

import AlbumsService from "../../shared/albums-service";
import SongsService from "../../shared/songs-service";
import Logger from "../../shared/logger";
import Upload from "./Upload";

import "./index.scss";
import Cover from "../../components/AlbumItem/Cover";
import Duration from "../../components/Duration";
import InputText from "../../atoms/InputText";
import Button from "../../atoms/Button";
import FormGroup from "../../atoms/FormGroup";

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
        this.loadAlbum();
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

    if(!window.confirm(`¿Quieres eliminar ${song.title}? ¡Es irreversible!`)){
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
      return <div className="container smaller"><p>Loading...</p></div>
    }
    return (
      <div className="container smaller">
        <h2>Editar álbum</h2>
        <form>
          <div className="row">
            <div className="col-5 col-sm-4">
              <label name="cover">
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,7L7,12H10V16H14V12H17L12,7Z" />
                </svg>
                <Cover covers={this.state.album.covers} />
                <input
                  ref={this.refInputCover}
                  type="file"
                  name="cover"
                  accept="image/png, image/jpeg"
                  onChange={this.handleChangeCover}
                />
              </label>
            </div>
            <div className="col-7 col-sm-8">
              <FormGroup>
                <InputText
                  label="Título del álbum"
                  type="text"
                  value={this.state.albumTitle}
                  onChange={this.handleAlbumTitleChange}
                />
              </FormGroup>
              <FormGroup>
                <InputText
                  label="Artista"
                  type="text"
                  value={this.state.album.artist.name}
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <InputText label="Año" type="text" value="En breve" disabled />
              </FormGroup>
              <FormGroup>
                <InputText label="Número de disco" type="text" value="En breve" disabled />
              </FormGroup>
            </div>
          </div>
        </form>

        {/* <Link to={`/album/${this.albumId}`}>Volver al álbum</Link> */}

        <h2>Editar canciones</h2>

        <div className="songs-list">
          {this.state.album.songs.map((song, index) => {
            return (
              <React.Fragment key={index}>
                <div className="drag-handler">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path fill="#CDCDED" d="M8.333 10c0 .45-.165.84-.496 1.17-.33.331-.72.497-1.17.497-.45 0-.84-.166-1.171-.496C5.166 10.84 5 10.45 5 10c0-.45.165-.84.496-1.17.33-.331.72-.497 1.17-.497.45 0 .84.166 1.171.496.331.331.496.721.496 1.171zm0 5.833c0 .45-.165.84-.496 1.171-.33.33-.72.496-1.17.496-.45 0-.84-.165-1.171-.496-.33-.33-.496-.72-.496-1.17 0-.45.165-.84.496-1.171.33-.331.72-.496 1.17-.496.45 0 .84.165 1.171.496.331.33.496.72.496 1.17zm0-11.666c0 .45-.165.84-.496 1.17-.33.331-.72.496-1.17.496-.45 0-.84-.165-1.171-.496-.33-.33-.496-.72-.496-1.17 0-.45.165-.84.496-1.171.33-.33.72-.496 1.17-.496.45 0 .84.165 1.171.496.331.33.496.72.496 1.17zM15.833 10c0 .45-.165.84-.496 1.17-.33.331-.72.497-1.17.497-.45 0-.84-.166-1.171-.496-.33-.331-.496-.721-.496-1.171 0-.45.165-.84.496-1.17.33-.331.72-.497 1.17-.497.45 0 .84.166 1.171.496.331.331.496.721.496 1.171zm0 5.833c0 .45-.165.84-.496 1.171-.33.33-.72.496-1.17.496-.45 0-.84-.165-1.171-.496-.33-.33-.496-.72-.496-1.17 0-.45.165-.84.496-1.171.33-.331.72-.496 1.17-.496.45 0 .84.165 1.171.496.331.33.496.72.496 1.17zm0-11.666c0 .45-.165.84-.496 1.17-.33.331-.72.496-1.17.496-.45 0-.84-.165-1.171-.496-.33-.33-.496-.72-.496-1.17 0-.45.165-.84.496-1.171.33-.33.72-.496 1.17-.496.45 0 .84.165 1.171.496.331.33.496.72.496 1.17z" />
                  </svg>
                </div>
                <div className="position">
                  {song.position}
                </div>
                <div className="title">
                  <InputText type="text" value={song.title} onChange={(e) => {this.handleSongTitleChange(e, index)}}/>
                </div>
                <div className="actions">
                  <button className="unstyled delete" onClick={() => {this.remove(index)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <g fill="none" fillRule="evenodd">
                        <path d="M0 0L20 0 20 20 0 20z" />
                        <path stroke="#FF0182" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.333 5.833L16.667 5.833M8.333 9.167L8.333 14.167M11.667 9.167L11.667 14.167M4.167 5.833l.833 10c0 .92.746 1.667 1.667 1.667h6.666c.92 0 1.667-.746 1.667-1.667l.833-10M7.5 5.833v-2.5c0-.46.373-.833.833-.833h3.334c.46 0 .833.373.833.833v2.5" />
                      </g>
                    </svg>
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <h2>Agregar canciones</h2>
        <Upload
          albumId={this.albumId}
          onUpload={this.loadAlbum}
        />

      </div>
    );
  }
}

export default AlbumEdit;
