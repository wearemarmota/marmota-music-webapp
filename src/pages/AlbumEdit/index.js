import React, { Component } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";

import AlbumsService from "../../shared/albums-service";
import Logger from "../../shared/logger";

import "./index.scss";

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

  handleTitleChange = (e) => {
    this.logger.log("handleTitleChange");
    this.setState({
      albumTitle: e.target.value,
    });
    this.updateTitleDebounced();
  }

  updateAlbumTitle = () => {
    AlbumsService.update(this.state.album.id, this.state.albumTitle).then((result) => {
      this.logger.log(result);
    });
  }

  updateAlbumTitleDebounced = debounce(this.updateAlbumTitle, 1000);

  render() {
    if(!this.state.album){
      return <div className="container"><p>Loading...</p></div>
    }
    return (
      <div className="container">
        <h2>Editar el álbum</h2>
        <form>
          <div>
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
              onChange={this.handleTitleChange}
            />
          </div>
        </form>
        <Link to={`/album/${this.albumId}`}>Volver al álbum</Link>
      </div>
    );
  }
}

export default AlbumEdit;
