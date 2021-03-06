import React from "react";
import sortBy from "lodash/sortBy";
import withQueueContext from "../../../hoc/queue";
import { Link } from "react-router-dom";

import ArtistImage from "../../../components/ArtistItem/Image"
import Button from "../../../atoms/Button";
import Dropdown from "../../../components/Dropdown";

import "./index.scss";

const Header = props => {
  const { artist, albums } = props;

  const songsCount = albums.reduce((accumulator, album) => {
    return accumulator + album.songs.length;
  }, 0);

  const replaceQueueAndPlay = e => {
    const {
      setSongs,
      setCurrentIndex,
      setPlaying,
    } = props.queueContext;

    const songsToAppend = albums.reduce((accumulator, album) => {
      const songsInOrder = sortBy(album.songs, [function(o){ return o.position; }]);
      const songs = songsInOrder.reduce((accumulator, song) => {
        song.album = Object.assign({}, album);
        delete song.album.songs;
        accumulator.push(song);
        return accumulator;
      }, []);
      accumulator.push(...songs);
      return accumulator;
    }, [])

    setSongs(songsToAppend).then(() => {
      setCurrentIndex(0).then(() => {
        setPlaying(false).then(setPlaying(true));
      });
    });
  }


  return(
    <header className="artist-header">
      <div className="container">
        <ArtistImage images={artist.images} name={artist.name} />
        <div className="data">
          <h2 className="mt-0">{artist.name}</h2>
          <p>{albums.length} álbums disponibles</p>
          <div className="actions">
            <Button primary minWidth onClick={replaceQueueAndPlay}>Reproducir {songsCount} temas</Button>
              <Dropdown>
                <Dropdown.Handler>
                  <Button>
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
                    </svg>
                  </Button>
                </Dropdown.Handler>
                <Dropdown.List>
                  <Dropdown.Item hideOnClick><Link to={`/artist/${artist.id}/edit`}>Editar artista</Link></Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item disabled>Compartir</Dropdown.Item>
                </Dropdown.List>
              </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
}

export default withQueueContext(Header);