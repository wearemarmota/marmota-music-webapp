import { useState } from "react";

import FavoritesService from "../shared/favorites-service";

const useFavorite = (songId, _isFavorited = false) => {
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);
  const [isFavorited, setIsFavorited] = useState(_isFavorited);

  const addToFavorites = () => {
    if (isUpdatingFavorite) return;
    setIsUpdatingFavorite(true);
    FavoritesService.create(songId).then(() => {
      setIsUpdatingFavorite(false);
      setIsFavorited(true);
    });
  };

  const removeFromFavorites = () => {
    if (isUpdatingFavorite) return;
    setIsUpdatingFavorite(true);
    FavoritesService.remove(songId).then(() => {
      setIsUpdatingFavorite(false);
      setIsFavorited(false);
    });
  };

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFromFavorites(songId);
    } else {
      addToFavorites(songId);
    }
  };

  return {
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isUpdatingFavorite,
    isFavorited,
  };
};

export default useFavorite;
