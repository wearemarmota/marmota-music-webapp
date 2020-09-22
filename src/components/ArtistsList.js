import React, { Component } from "react";
import Artist from "./Artist";

class ArtistsList extends Component {
  render() {
    return (
      <div className="row">
        {this.props.artists.map((artist, index) => {
          return (
            <div className="col-4 col-md-3 col-lg-2 col-xl-1" key={index}>
              <Artist artist={artist}></Artist>
            </div>
          );
        })}
      </div>
    );
  }
}

ArtistsList.defaultProps = {
  artists: [],
};

export default ArtistsList;
