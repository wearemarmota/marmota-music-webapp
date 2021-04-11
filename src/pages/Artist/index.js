import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import AlbumsService from "../../shared/albums-service";
import ArtistsService from "../../shared/artists-service";

import Header from "./Header";
import AlbumsList from "../../components/AlbumsList";
import AlbumsListPhantom from "../../components/AlbumsList/Phantom";

const Artist = props => {

  const { artistId } = useParams();

  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [loadingArtist, setLoadingArtist] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    setLoadingAlbums(true);
    setLoadingArtist(true);
    
    AlbumsService.listByArtist(artistId, {withSongs: 1})
      .then(albums => setAlbums(albums))
      .finally(() => setLoadingAlbums(false));

    ArtistsService.get(artistId)
      .then(artist => setArtist(artist))
      .finally(() => setLoadingArtist(false));
  
  }, [artistId]);

  return (
    <>
      { artist && <Header artist={artist} albums={albums} /> }
      <div className="container">
        { loadingArtist && <h2>Cargando...</h2> }
        { loadingAlbums && <AlbumsListPhantom amount={6} /> }
        { albums.length > 0 && <AlbumsList albums={albums} /> }
        { !loadingAlbums && albums.length <= 0 && <p>No se han encontrado álbums</p> }
      </div>
    </>
  )
}

export default Artist;