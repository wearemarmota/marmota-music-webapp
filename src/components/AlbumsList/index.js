import React, { Component } from "react";
import Album from "../Album";

import "./index.scss";

class AlbumsList extends Component {
  render() {
    return (
      <div className="row">
        {this.props.albums.map((album, index) => {
          return (
            <div key={index} className="col-4 col-md-3 col-lg-2 col-xl-2">
              <Album album={album} />
            </div>
          );
        })}
      </div>
    );
  }
}

AlbumsList.defaultProps = {
  albums: [],
};

export default AlbumsList;
