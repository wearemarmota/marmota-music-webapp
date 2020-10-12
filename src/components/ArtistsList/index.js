import React, { Component } from "react";
import ArtistItem from "../ArtistItem";

import "./index.scss";

class ArtistsList extends Component {
  render() {
    return (
      <div className="row">
        {this.props.artists.map((artist, index) => {
          return (
            <div className="col-4 col-md-3 col-lg-2 col-xl-2" key={index}>
              <ArtistItem artist={artist} />
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
