import React from "react";
import { Link } from "react-router-dom";

import Cover from "../../AlbumItem/Cover";
import Duration from "../../Duration";

import "./index.scss";

const CurrentSong = props => {

  if(!props.song){
    return <div id="song"></div>;
  }
  
  const { song, seconds } = props;
  const { album } = song;
  const { artist } = album;

  return (
    <div id="song">
      <Cover
        title={album.title}
        covers={album.covers}
        className="cover"
        size="100"
      />
      <div className="song-data">
        <div className="title">{song.title}</div>
        <div className="artist-and-album">
          <Link to={`/album/${album.id}`}>{album.title}</Link>
          {" - "}
          <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
        </div>
        <div className="duration-and-proggress">
          <Duration seconds={seconds} /> {" - "}
          <Duration seconds={song.duration} />
        </div>
      </div>
    </div>
  );
}

export default CurrentSong;