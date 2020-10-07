import React, { Component } from "react";
import { Link } from "react-router-dom";
import AlbumsService from "../../shared/albums-service";
import Logger from "../../shared/logger";

import "./index.scss";

class AlbumEdit extends Component {
  constructor(props) {
    super(props);

    this.albumId = this.props.match.params.albumId;
    this.state = {
      album: null,
    };
  }

  componentDidMount() {
    this.logger = new Logger("AlbumEdit");
    AlbumsService.get(this.albumId).then((album) => {
      this.logger.log(album);
      this.setState({
        album: album,
      });
    });
  }

  changeCover = (e) => {
    this.logger.log("changeCover");
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

  render() {
    if(!this.state.album){
      return <div className="container"><p>Loading...</p></div>
    }
    return (
      <div className="container">
        <h2>Editar el álbum</h2>
        <form>
          <input
            type="file"
            name="cover"
            accept="image/png, image/jpeg"
            onChange={this.changeCover}
          />
        </form>
        <Link to={`/album/${this.albumId}`}>Volver al álbum</Link>
      </div>
    );
  }
}

export default AlbumEdit;
