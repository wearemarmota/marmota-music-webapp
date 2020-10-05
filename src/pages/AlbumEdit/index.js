import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { withRouter } from "react-router-dom";
// import SongsService from "../../shared/songs-service";
import AlbumsService from "../../shared/albums-service";
// import withQueueContext from "../../hoc/queue";
import Logger from "../../shared/logger";

import "./index.scss";

class AlbumEdit extends Component {
  constructor(props) {
    super(props);

    this.albumId = this.props.match.params.albumId;
    this.state = {
      // songs: [],
      // loading: false,
    };
  }

  componentDidMount() {
    // this.setState({ loading: true });
    // SongsService.listByAlbum(this.albumId).then((songs) => {
    //   this.setState({
    //     songs: songs,
    //     loading: false,
    //   });
    // });
    this.logger = new Logger("AlbumEdit");
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

// export default withRouter(withQueueContext(AlbumEdit));
export default AlbumEdit;
