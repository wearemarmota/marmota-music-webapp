import React, { Component } from "react";
import classNames from "classnames/bind";
import withQueueContext from "../../hoc/queue";

import Cover from "../Album/Cover";

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
        <SongItem key={index} {...props} song={song} index={index} />
      ))}
    </>
  );
}

function SongItem(props) {
  const { song, index, queueContext: queue } = props;
  return (
    <div
      className={classNames("song-item", {
        current: song.uuid === queue.getCurrentSong().uuid,
      })}
      onClick={() => {
        queue.setCurrentIndex(index).then(() => {
          queue.setPlaying(false).then(queue.setPlaying(true));
        });
      }}
    >
      <Cover title={song.album.title} covers={song.album.covers} size="100" />
      <div className="info">
        <div className="title">{song.title}</div>
        <div className="artist">{song.album.artist.name}</div>
      </div>
      <div className="duration">
        {new Date(song.duration * 1000).toISOString().substr(14, 5)}
      </div>
    </div>
  );
}

function EmptyQueue() {
  return <div className="empty">
    <svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M2,6V8H14V6H2M2,10V12H11V10H2M14.17,10.76L12.76,12.17L15.59,15L12.76,17.83L14.17,19.24L17,16.41L19.83,19.24L21.24,17.83L18.41,15L21.24,12.17L19.83,10.76L17,13.59L14.17,10.76M2,14V16H11V14H2Z" />
    </svg>
    <div>La cola está vacía</div>
  </div>;
}

export default withQueueContext(Queue);
