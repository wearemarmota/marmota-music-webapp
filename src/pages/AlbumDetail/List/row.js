import { useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import FavoritesService from "../../../shared/favorites-service";

import Duration from "../../../components/Duration";
import Dropdown from "../../../components/Dropdown";

import {
  IconSpeaker,
  IconHeartOutline,
  IconPlay,
  IconMenu,
  IconHeartFilled
} from "../icons";

const Row = ({ index, song, playSong, currentSong, appendSongToQueue, album }) => {

  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);
  const [isFavorited, setIsFavorited] = useState(song.isFavorited);

  const addToFavorites = songId => {
    if(isUpdatingFavorite) return;
    setIsUpdatingFavorite(true);
    FavoritesService.create(songId).then(() => {
      setIsUpdatingFavorite(false);
      setIsFavorited(true);
    });
  }

  const removeFromFavorites = songId => {
    if(isUpdatingFavorite) return;
    setIsUpdatingFavorite(true);
    FavoritesService.remove(songId).then(() => {
      setIsUpdatingFavorite(false);
      setIsFavorited(false);
    });
  }

  const toggleFavorite = (isCurrentlyFavorited, songId) => {
    if(isCurrentlyFavorited){
      removeFromFavorites(songId);
    }else{
      addToFavorites(songId);
    }
  }

  return (
    <tr onDoubleClick={e => playSong(index)} key={index} className={classNames({
      playing: currentSong && currentSong.id === song.id
    })}>
      <td className="column-like">
        <button
          className="unstyled like"
          disabled={isUpdatingFavorite} 
          onClick={e => toggleFavorite(isFavorited, song.id)}
        >
          { isFavorited ? 
            <IconHeartFilled /> :
            <IconHeartOutline />
          }
        </button>
      </td>
      <td className="column-position-and-status">
        <div className="position">{song.position}</div>
        <div className="icon-speaker"><IconSpeaker /></div>
        <button className="unstyled icon-play" onClick={e => playSong(index)}><IconPlay /></button>
      </td>
      <td className="column-title">{song.title}</td>
      <td className="column-artist d-none d-md-table-cell"><Link to={`/artist/${album.artist.id}`}>{album.artist.name}</Link></td>
      <td className="column-duration d-none d-md-table-cell">
        <Duration seconds={song.duration} />
      </td>
      <td className="column-actions">
        <Dropdown>
          <Dropdown.Handler>
            <button className="unstyled dropdown-handler">
              <IconMenu />
            </button>
          </Dropdown.Handler>
          <Dropdown.List offset={{bottom: 90}}>
            <Dropdown.Item hideOnClick>
              <button className="unstyled" onClick={() => appendSongToQueue(song)}>Agregar a la cola</button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </td>
    </tr>
  );
}

export default Row;