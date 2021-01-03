import React from "react";
import { Link } from "react-router-dom";

import Cover from "../../../components/AlbumItem/Cover";
import Button from "../../../atoms/Button";
import Dropdown from "../../../components/Dropdown";

import "./index.scss";

export default function Header(props) {

  const { isPhantom, album, play, appendAlbumToQueue } = props;

  const albumDurationSeconds = album.songs.reduce((n, {duration}) => n + duration, 0);
  const albumDurationMinutes = Math.round(albumDurationSeconds/60);

  return (
    <header className="album-details-header">
      <div className="main-cover">
        {
          isPhantom ?
          <Cover.Phantom className="main-cover" color="#151f43" /> :
          <Cover title={album.title} covers={album.covers} className="main-cover" alt={album.title + " cover"} />
        }
      </div>
      <div className="album-info">
        <h1>{album.title}</h1>
        <div className="author">De <Link to={`/artist/${album.artist.id}`}>{album.artist.name}</Link></div>
        <div className="context">{album.songs.length} canciones &middot; {albumDurationMinutes} minutos</div>
      </div>
      <div className="actions">
        <Button primary minWidth onClick={play} disabled={album.songs.length === 0}>Reproducir</Button>
        <Button minWidth onClick={appendAlbumToQueue} disabled={album.songs.length === 0}>Agregar a la cola</Button>
        <Dropdown>
          <Dropdown.Handler>
            <Button>
              <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
              </svg>
            </Button>
          </Dropdown.Handler>
          <Dropdown.List>
            <Dropdown.Item hideOnClick><Link to={`/album/${album.id}/edit`}>Editar álbum</Link></Dropdown.Item>
            <Dropdown.Item disabled>Descargar álbum</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item disabled>Añadir a una playlist</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item disabled>Compartir</Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </div>
    </header>
  );
}

Header.defaultProps = {
  isPhantom: false,
  album: {
    title: "Cargando...",
    songs: [],
    covers: {},
    artist: {
      id: 0,
      name: "Cargando...",
    }
  },
  play: () => {},
  appendAlbumToQueue: () => {},
}