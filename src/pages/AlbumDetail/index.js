import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";

import AlbumsService from "../../shared/albums-service";
import { createSongsListItem } from "../../shared/factories";
import QueueContext from "../../context/Queue";

import Cover from "../../components/AlbumItem/Cover";
import Header from "./Header";
import SongsList from "../../components/SongsList";
import EmptyAlbum from "./EmptyAlbum";

import "./index.scss";

const AlbumDetail = props => {

  const { albumId } = useParams();

  const [loading, setLoading] = useState(false);
  const [album, setAlbum] = useState(null);
  const queue = useContext(QueueContext);

  useEffect(() => {
    setLoading(true);
    AlbumsService.get(albumId).then(album => {
      album.songs = album.songs.map(song => createSongsListItem({
        song: song,
        album: album,
        artist: album.artist,
      }));
      setLoading(false);
      setAlbum(album);
    });
  }, [albumId]);

  if(loading) return <Loading />
  if(!loading && !album) return <Error />

  const play = (index = 0) => {
    const { setSongs, setCurrentIndex, setPlaying } = queue;
    setSongs(cloneDeep(album.songs)).then(() => {
      setCurrentIndex(index).then(() => {
        setPlaying(false).then(setPlaying(true));
      });
    });
  };

  const append = () => {
    const { songs, setSongs } = queue;
    setSongs([].concat(songs, album.songs));
  };

  return(
    <>
      <Cover
        covers={album.covers}
        className="background-cover"
        alt={album.title + " cover"}
      />

      <div className="container small">
        <Header album={album} play={play} append={append} />
        { album.songs.length <= 0 && <EmptyAlbum /> }
        { album.songs.length > 0 && <SongsList songs={album.songs} /> }
      </div>
    </>

  );
}

const Loading = () => <div className="container small">
  <Header isPhantom />
</div>;

const Error = () => <div className="container small">
  <p>Mmm... algo ha ido mal</p>
</div>;

export default AlbumDetail;