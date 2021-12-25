import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import useFavorite from "../../hooks/useFavorite";
import { isTouchDevice } from "../../shared/utils";
import {
  replaceQueueSongs,
  addQueueSongs,
  setCurrentSong,
  setPlaying,
} from "../../redux/actions/queue";

import Cover from "../AlbumItem/Cover";
import Duration from "../Duration";
import Dropdown from "../Dropdown";
import { Loader } from "../Icons";

import {
  IconSpeaker,
  IconHeartOutline,
  IconPlay,
  IconMenu,
  IconHeartFilled,
} from "./icons";

import "./index.scss";

const SongsList = ({ songs, showCovers = false, queueAll = true }) => {
  const dispatch = useDispatch();
  const { songs: songsQueue, currentSong } = useSelector(
    (state) => state.queue
  );

  const replaceQueueAndPlay = useCallback(
    (index = 0) => {
      dispatch(replaceQueueSongs(songs));
      dispatch(setCurrentSong(index));
      dispatch(setPlaying(false));
      dispatch(setPlaying(true));
    },
    [dispatch, songs]
  );

  const playNext = useCallback(
    (index = 0) => {
      const before = songsQueue.slice(0, currentSong + 1);
      const after = songsQueue.slice(currentSong + 1, songsQueue.length);
      dispatch(replaceQueueSongs([].concat(before, songs[index], after)));
      dispatch(setCurrentSong(currentSong + 1));
      dispatch(setPlaying(currentSong + 1));
    },
    [songs, currentSong, songsQueue, dispatch]
  );

  const play = queueAll ? replaceQueueAndPlay : playNext;

  return (
    <section className="songs-list">
      <ListHeader />
      <main>
        {songs.map((song, index) => (
          <ListRow
            key={song.id}
            index={index}
            song={song}
            showCover={showCovers}
            play={play}
          />
        ))}
      </main>
    </section>
  );
};

const ListHeader = () => {
  return (
    <header>
      <div className="like"></div>
      <div className="position"></div>
      <div className="title">Título</div>
      <div className="artist">Artista</div>
      <div className="album">Álbum</div>
      <div className="duration">Duración</div>
      <div className="actions"></div>
    </header>
  );
};

const ListRow = ({ index, song, showCover, play }) => {
  const dispatch = useDispatch();
  const { songs, currentSong } = useSelector((state) => state.queue);

  const { isUpdatingFavorite, isFavorited, toggleFavorite } = useFavorite(
    song.id,
    song.isFavorited
  );

  const addToQueue = () => dispatch(addQueueSongs([song]));

  const playingThis = songs[currentSong]?.uuid === song.uuid;

  const onHeartClick = (e) => {
    e.stopPropagation();
    toggleFavorite();
  };

  return (
    <article
      playing={playingThis.toString()}
      onClick={() => {
        if (isTouchDevice()) play(index);
      }}
    >
      <div className="like">
        <button
          className="unstyled"
          disabled={isUpdatingFavorite}
          onClick={onHeartClick}
        >
          {isUpdatingFavorite && <Loader />}
          {!isUpdatingFavorite &&
            (isFavorited ? <IconHeartFilled /> : <IconHeartOutline />)}
        </button>
      </div>
      <div className="position">
        {showCover ? (
          <Cover covers={song.album.covers} title={song.album.title} />
        ) : (
          <span className="number">{song.position}</span>
        )}
        <div className="icon-speaker">
          <IconSpeaker />
        </div>
        <button className="unstyled icon-play" onClick={(e) => play(index)}>
          <IconPlay />
        </button>
      </div>
      <div className="title">{song.title}</div>
      <div className="artist">
        <Link to={`/artist/${song.album.artist.id}`}>
          {song.album.artist.name}
        </Link>
      </div>
      <div className="album">
        <Link to={`/album/${song.album.id}`}>{song.album.title}</Link>
      </div>
      <div className="duration">
        <Duration seconds={song.duration} />
      </div>
      <div className="actions">
        <Dropdown>
          <Dropdown.Handler>
            <button className="unstyled dropdown-handler">
              <IconMenu />
            </button>
          </Dropdown.Handler>
          <Dropdown.List offset={{ bottom: 90 }}>
            <Dropdown.Item hideOnClick>
              <button className="unstyled" onClick={addToQueue}>
                Agregar a la cola
              </button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </div>
    </article>
  );
};

export default SongsList;
