import { useState, useContext, useEffect, useRef } from "react";
import cloneDeep from "lodash/cloneDeep";

import QueueContext from "../../context/Queue"; 
import AlbumsService from "../../shared/albums-service";
import { createSongsListItem } from "../../shared/factories";

import { Link } from "react-router-dom";
import Cover from "./Cover";

import "./index.scss";

const AlbumItem = ({ album, showGlow, showArtist = true, showTitle = true }) => {
  return(
    <article className="album">
      <div className="cover">
        <Link to={`/album/${album.id}`}>
          <Cover
            covers={album.covers}
            title={album.title}
            alt={`${album.title} cover`}
          />
          {showGlow && (
            <Cover covers={album.covers} className="cover-component-glow" alt="cover" />
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
}

const PlayButton = ({ album }) => {

  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const queue = useContext(QueueContext);
  const firstUpdate = useRef(true);

  const replaceQueueAndPlay = () => {
    if(songs.length === 0){
      return;
    }
    queue.setSongs(cloneDeep(songs)).then(() => {
      queue.setCurrentIndex(0).then(() => {
        queue.setPlaying(false).then(queue.setPlaying(true));
      });
    });
  }

  const play = () => {
    if(songs.length > 0){
      replaceQueueAndPlay();
      return;
    }
    if(loading) return;
    setLoading(true);
    AlbumsService.get(album.id).then(album => {
      setLoading(false);
      setSongs(album.songs.map(song => createSongsListItem({
        song: song,
        album: album,
        artist: album.artist,
      })));
    });
  }

  useEffect(() => {
    if(firstUpdate.current){
      firstUpdate.current = false;
      return;
    }
    replaceQueueAndPlay();
  }, [songs])

  return (
    <button className="play unstyled" onClick={play} aria-label={`Play ${album.title} album`}>
      <svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
      </svg>
    </button>
  )
}

export default AlbumItem;