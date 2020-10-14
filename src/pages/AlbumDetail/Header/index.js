import React from "react";
import { Link } from "react-router-dom";

import Cover from "../../../components/AlbumItem/Cover";

import "./index.scss";

export default function Header(props) {

  const { album, play, append } = props;

  const albumDurationSeconds = album.songs.reduce((n, {duration}) => n + duration, 0);
  const albumDurationMinutes = Math.round(albumDurationSeconds/60);

  return (
    <header className="album-details-header">
      <Cover covers={album.covers} className="main-cover" alt={album.title + " cover"} />
      <div>
        <h1>{album.title}</h1>
        <div className="author">De <Link to={`/artist/${album.artist.id}`}>{album.artist.name}</Link></div>
        <div className="context">{album.songs.length} canciones &middot; {albumDurationMinutes} minutos</div>
        <div className="actions">
          <button className="primary with-min-width" onClick={play} disabled={album.songs.length === 0}>Reproducir</button>
          <button className="with-min-width" onClick={append} disabled={album.songs.length === 0}>Agregar a la cola</button>
          <Link to={`/album/${album.id}/edit`}>
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}