import React, { Component } from "react";
import classNames from "classnames/bind";
import withQueueContext from "../../hoc/queue";

import Cover from "../AlbumItem/Cover";
import Duration from "../Duration";
import Header from "./Header";

import "./index.scss";

class Queue extends Component {
  render() {
    const { queueContext: queue } = this.props;

    return (
      <div id="queue" className={classNames({ visible: queue.visible })}>
        <Header title="A continuación" closeAction={ () => queue.setVisible(false) } />
        <div class="queue-content">
        {
          (queue.songs.length > 0) ?
          <SongsList {...this.props} /> :
          <EmptyQueue />
        }
        </div>
      </div>
    );
  }
}

function SongsList(props) {
  const { queueContext: queue } = props;
  return (
    queue.songs.map((song, index) => (
      <SongItem key={index} {...props} song={song} index={index} />
    ))
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
      <Cover title={song.album.title} covers={song.album.covers} size="100" className="cover" />
      <div className="info">
        <div className="title">{song.title}</div>
        <div className="artist-and-duration">{song.album.artist.name} &middot; <Duration seconds={song.duration} /></div>
      </div>
      <div className="overflow-menu">
        <button className="unstyled" onClick={(e) => {
            e.stopPropagation();
            queue.songs.splice(index, 1);
            queue.setSongs(queue.songs);
        }}>
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>
        </button>
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
