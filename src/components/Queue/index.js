import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";

import Cover from "../AlbumItem/Cover";
import Duration from "../Duration";
import Header from "./Header";

import "./index.scss";
import {
  moveQueuePrevSong,
  removeIndex,
  setCurrentSong,
  setPlaying,
  setQueueVisible,
} from "../../redux/actions/queue";

const Queue = (props) => {
  const { visible, songs } = useSelector((state) => state.queue);
  const dispatch = useDispatch();

  const hideQueue = () => dispatch(setQueueVisible(false));

  return (
    <div id="queue" className={classNames({ visible: visible })}>
      <Header title="A continuación" closeAction={hideQueue} />
      <div className="queue-content">
        {songs.length > 0 ? <SongsList {...props} /> : <EmptyQueue />}
      </div>
    </div>
  );
};

const SongsList = (props) => {
  const { songs } = useSelector((state) => state.queue);
  return songs.map((song, index) => (
    <SongItem key={index} {...props} song={song} index={index} />
  ));
};

const SongItem = ({ song, index }) => {
  const { songs, currentSong } = useSelector((state) => state.queue);

  const dispatch = useDispatch();

  const isCurrentSong = song.uuid === songs[currentSong]?.uuid;

  const removeSongFromQueue = useCallback(
    (e) => {
      e.stopPropagation();
      if (index < currentSong) {
        // If removing a previous song:
        dispatch(moveQueuePrevSong());
        dispatch(removeIndex(index));
      } else if (index === currentSong) {
        // If removing the current song:
        if (currentSong >= songs.length - 1 && songs.length > 1) {
          dispatch(moveQueuePrevSong());
        }
        dispatch(setPlaying(false));
        dispatch(removeIndex(index));
      } else if (index > currentSong) {
        // If removing later song
        dispatch(removeIndex(index));
      }
    },
    [dispatch, currentSong, songs, index]
  );

  const click = useCallback(() => {
    dispatch(setCurrentSong(index));
    dispatch(setPlaying(false));
    dispatch(setPlaying(true));
  }, [dispatch, index]);

  return (
    <div
      className={classNames("song-item", { current: isCurrentSong })}
      onClick={click}
    >
      <Cover
        title={song.album.title}
        covers={song.album.covers}
        size="100"
        className="cover"
      />
      <div className="info">
        <div className="title">{song.title}</div>
        <div className="artist-and-duration">
          {song.album.artist.name} &middot; <Duration seconds={song.duration} />
        </div>
      </div>
      <div className="overflow-menu">
        <button
          className="unstyled"
          onClick={removeSongFromQueue}
          aria-label={`Remove ${song.title} from queue`}
        >
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M2,6V8H14V6H2M2,10V12H11V10H2M14.17,10.76L12.76,12.17L15.59,15L12.76,17.83L14.17,19.24L17,16.41L19.83,19.24L21.24,17.83L18.41,15L21.24,12.17L19.83,10.76L17,13.59L14.17,10.76M2,14V16H11V14H2Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

function EmptyQueue() {
  return (
    <div className="empty">
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M2,6V8H14V6H2M2,10V12H11V10H2M14.17,10.76L12.76,12.17L15.59,15L12.76,17.83L14.17,19.24L17,16.41L19.83,19.24L21.24,17.83L18.41,15L21.24,12.17L19.83,10.76L17,13.59L14.17,10.76M2,14V16H11V14H2Z"
        />
      </svg>
      <div>La cola está vacía</div>
    </div>
  );
}

export default Queue;
