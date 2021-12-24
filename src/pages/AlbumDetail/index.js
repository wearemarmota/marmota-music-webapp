import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import AlbumsService from "../../shared/albums-service";
import { createSongsListItem } from "../../shared/factories";

import Cover from "../../components/AlbumItem/Cover";
import Header from "./Header";
import SongsList from "../../components/SongsList";
import EmptyAlbum from "./EmptyAlbum";

import "./index.scss";
import { useDispatch } from "react-redux";
import {
  addQueueSongs,
  replaceQueueSongs,
  setCurrentSong,
  setPlaying,
} from "../../redux/actions/queue";

const AlbumDetail = () => {
  const { albumId } = useParams();

  const [loading, setLoading] = useState(false);
  const [album, setAlbum] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    AlbumsService.get(albumId).then((album) => {
      album.songs = album.songs.map((song) =>
        createSongsListItem({
          song: song,
          album: album,
          artist: album.artist,
        })
      );
      setLoading(false);
      setAlbum(album);
    });
  }, [albumId]);

  const append = useCallback(() => {
    if (!album) return;
    dispatch(addQueueSongs(album.songs));
  }, [dispatch, album]);

  const play = useCallback(
    (index = 0) => {
      if (!album) return;
      dispatch(replaceQueueSongs(album.songs));
      dispatch(setCurrentSong(index));
      dispatch(setPlaying(false));
      dispatch(setPlaying(true));
    },
    [dispatch, album]
  );

  if (loading) return <Loading />;
  if (!loading && !album) return <Error />;

  return (
    <>
      <Cover
        covers={album.covers}
        className="background-cover"
        alt={album.title + " cover"}
      />

      <div className="container small">
        <Header album={album} play={play} append={append} />
        {album.songs.length <= 0 && <EmptyAlbum />}
        {album.songs.length > 0 && <SongsList songs={album.songs} />}
      </div>
    </>
  );
};

const Loading = () => (
  <div className="container small">
    <Header isPhantom />
  </div>
);

const Error = () => (
  <div className="container small">
    <p>Mmm... algo ha ido mal</p>
  </div>
);

export default AlbumDetail;
