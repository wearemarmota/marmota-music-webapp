import { useState, useEffect } from "react";

import AlbumsService from "./../shared/albums-service";

import AlbumsList from "../components/AlbumsList";
import AlbumsListPhantom from "../components/AlbumsList/Phantom";

const Albums = props => {

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    AlbumsService.list({ limit: 999, sortBy: 'title', orderBy: 'asc' })
      .then(albums => setAlbums(albums))
      .finally(() => setLoading(false))
  }, []);

  return(
    <div className="container">
      <h2>Todos los álbums</h2>
      { loading && <AlbumsListPhantom amount={18} /> }
      { albums.length > 0 && <AlbumsList albums={albums} showAlbumsGlow={false} /> }
      { !loading && albums.length <= 0 && 
        <p>No se han encontrado álbums</p>
      }
    </div>
  )
};

export default Albums;
