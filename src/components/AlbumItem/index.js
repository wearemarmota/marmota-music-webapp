import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import AlbumsService from "../../shared/albums-service";
import { createSongsListItem } from "../../shared/factories";
import {
  replaceQueueSongs,
  setCurrentSong,
  setPlaying,
} from "../../redux/actions/queue";

import Cover from "./Cover";
import { Loader } from "../Icons";

import "./index.scss";

const AlbumItem = ({
  album,
  showGlow,
  preloadedFadeIn,
  showArtist = true,
  showTitle = true,
}) => {
  return (
    <article className="album">
      <div className="cover">
        <Link to={`/album/${album.id}`}>
          <Cover
            covers={album.covers}
            title={album.title}
            alt={`${album.title} cover`}
            preloadedFadeIn={preloadedFadeIn}
          />
          {showGlow && (
            <Cover
              covers={album.covers}
              className="cover-component-glow"
              alt="cover"
              preloadedFadeIn={preloadedFadeIn}
            />
          )}
        </Link>
        <PlayButton album={album} />
      </div>

      {showTitle && (
        <h1 className="title">
          <Link to={`/album/${album.id}`}>{album.title}</Link>
        </h1>
      )}

      {showArtist && (
        <div className="artist">
          <Link to={`/artist/${album.artist.id}`}>{album.artist.name}</Link>
        </div>
      )}
    </article>
  );
};

const PlayButton = ({ album }) => {
  const [loading, setLoading] = useState(false);
  const [albumSongs, setAlbumSongs] = useState([]);
  const firstUpdate = useRef(true);

  const dispatch = useDispatch();

  const replaceQueueAndPlay = useCallback(() => {
    if (albumSongs.length === 0) return;
    dispatch(replaceQueueSongs(albumSongs));
    dispatch(setCurrentSong(0));
    dispatch(setPlaying(false));
    dispatch(setPlaying(true));
  }, [dispatch, albumSongs]);

  const play = () => {
    // If the album is already loading:
    if (loading) return;
    // If the album is already loaded:
    if (albumSongs.length > 0) return replaceQueueAndPlay();
    // Else:
    setLoading(true);
    AlbumsService.get(album.id)
      .then((album) =>
        setAlbumSongs(
          album.songs.map((song) =>
            createSongsListItem({
              song: song,
              album: album,
              artist: album.artist,
            })
          )
        )
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    replaceQueueAndPlay();
  }, [albumSongs, replaceQueueAndPlay]);

  return (
    <button
      className="play unstyled"
      onClick={play}
      aria-label={`Play ${album.title} album`}
    >
      {loading && <Loader />}
      {!loading && (
        <svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
        </svg>
      )}
    </button>
  );
};

export default AlbumItem;
