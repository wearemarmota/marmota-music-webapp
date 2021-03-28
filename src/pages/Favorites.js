import { useState, useEffect } from "react";

import FavoritesService from "../shared/favorites-service";
import { createSongsListItem } from "../shared/factories";

import SongsList from "../components/SongsList";

const Favorites = props => {

  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    FavoritesService.list().then(favorites => {
      setFavorites(favorites.map(favorite => createSongsListItem({
        song: favorite,
        album: favorite.album,
        artist: favorite.album.artist,
      })));
    });
  }, []);

  return (
    <div className="container">
      <h2>Tus favoritos</h2>
      {
        favorites === null ?
        <p>Cargando</p> :
        favorites.length === 0 ?
        <p>Aún no tienes ninguno</p> :
        <SongsList songs={favorites} showCovers={true} />
      }
    </div>
  )
}


export default Favorites;