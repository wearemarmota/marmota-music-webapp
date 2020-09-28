import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import "./index.scss";

class Album extends Component {  
  render() {
    const ClickReceiver = this.props.onClick !== undefined ? AlbumButton : AlbumLink;
    const album = this.props.album;
    const artist = album.artist;
    return (
      <article className="album">
        <div className="cover">
          <ClickReceiver {...this.props}>
            <img src={`https://picsum.photos/seed/${album.title}/500/500`} className="cover" alt="cover" />
            { this.props.showGlow &&
              <img src={`https://picsum.photos/seed/${album.title}/500/500`} className="glow" alt="cover" />
            }
          </ClickReceiver>
        </div>
        { this.props.showTitle &&
          <h1 className="title"><Link to={`/album/${album.id}`}>{album.title}</Link></h1>
        }
        { this.props.showArtist &&
          <div className="artist"><Link to={`/artist/${artist.id}`}>{artist.name}</Link></div>
        }
      </article>
    );
  }

  static defaultProps = {
    showGlow: true,
    showTitle: true,
    showArtist: true,
  }
}

function AlbumLink(props){
  return(
    <Link to={`/album/${props.album.id}`}>{props.children}</Link>
  );
};

function AlbumButton(props){
  return(
    <button className="unstyled" onClick={props.onClick}>{props.children}</button>
  );
};

export default withRouter(Album);
