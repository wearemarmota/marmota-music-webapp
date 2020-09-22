import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import CreateArtist from "./CreateArtist";
import CreateAlbum from "./CreateAlbum";
import CreateSongs from "./CreateSongs";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      artist: null,
      album: null,
    };
  }

  render() {
    return (
      <div className="container">
        <h2>Subir música</h2>
        <h3>Paso {this.state.step} de 3</h3>

        <CreateArtist
          currentStep={this.state.step}
          next={() => this.setState({ step: 2 })}
          setArtist={(artist) => {
            this.setState({ artist: artist });
          }}
        />

        {this.state.artist && (
          <CreateAlbum
            currentStep={this.state.step}
            artist={this.state.artist}
            prev={() => this.setState({ step: 1, artist: null })}
            next={() => this.setState({ step: 3 })}
            setAlbum={(album) => {
              this.setState({ album: album });
            }}
          />
        )}

        {this.state.artist && this.state.album && (
          <CreateSongs
            artist={this.state.artist}
            album={this.state.album}
            prev={() => this.setState({ step: 2, album: null })}
            next={() => this.props.history.push(`album/${this.state.album.id}`)}
          />
        )}
      </div>
    );
  }
}

export default withRouter(Upload);
