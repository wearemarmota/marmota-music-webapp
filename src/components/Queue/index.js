import React, { Component } from "react";
import classNames from "classnames/bind";
import withQueueContext from "../../hoc/queue";

import "./index.scss";

class Queue extends Component {
  render() {
    const { queueContext: queue } = this.props;

    return (
      <div id="queue" className={classNames({ visible: queue.visible })}>
        {queue.songs.length > 0 ? (
          <SongsList {...this.props} />
        ) : (
          <EmptyQueue />
        )}
      </div>
    );
  }
}

function SongsList(props) {

  const { queueContext: queue } = props;

  return (
    <>
      {queue.songs.map((song, index) => (
        <div
          className={classNames("song-item", {
            current: song.uuid === queue.getCurrentSong().uuid,
          })}
          key={index}
        >
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

export default withQueueContext(Queue);
