import React, { Component } from "react";
import Album from "./Album";

class AlbumsList extends Component {
  render() {
    return (
      <div className="row">
        {this.props.albums.map((album, index) => {
          return (
            <div className="col-4 col-md-3 col-lg-2 col-xl-1">
              <Album key={index} album={album} />
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
