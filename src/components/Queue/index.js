import React, { Component } from "react";
import classNames from "classnames/bind";

import QueueContext from "../../QueueContext";

import "./index.scss";

class Player extends Component {
  static contextType = QueueContext;

  render() {
    const queue = this.context;

    return (
      <div id="queue" className={classNames({ visible: queue.visible })}>
        {queue.songs.length > 0 ? (
          <SongsList songs={queue.songs} />
        ) : (
          <EmptyQueue />
        )}
      </div>
    );
  }
}

function SongsList(props) {
  return (
    <>
      {props.songs.map((song, index) => (
        <div className="song-item" key={index}>
          <img src="https://www.placehold.it/90x90" />
          <div className="info">
            <div className="title">{song.title}</div>
            <div className="artist">{song.album.artist.name}</div>
          </div>
          <div className="duration">
            {new Date(song.duration * 1000).toISOString().substr(14, 5)}
          </div>
        </div>
      ))}
    </>
  );
}

function EmptyQueue() {
  return <div className="empty">La cola está vacía</div>;
}

export default Player;
