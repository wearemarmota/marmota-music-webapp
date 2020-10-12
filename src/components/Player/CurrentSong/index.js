import React from "react";
import Cover from "../../AlbumItem/Cover";
import Duration from "../../Duration";

import "./index.scss";

export default function CurrentSong(props) {
  return (
    <div id="song">
    {props.song && (
      <>
        <Cover
          title={props.song.album.title}
          covers={props.song.album.covers}
          className="cover"
          size="100"
        />
        <div className="song-data">
          <div className="title">
            {props.song.title}
          </div>
          <div className="artist-and-album">
            {props.song.album.title} {" - "}
            {props.song.album.artist.name}
          </div>
          <div className="duration-and-proggress">
            <Duration seconds={props.seconds} /> {" - "}
            <Duration seconds={props.song.duration} />
          </div>
        </div>
      </>
    )}
  </div>
);
}
