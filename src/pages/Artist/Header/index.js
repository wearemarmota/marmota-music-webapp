import React from "react";
import sortBy from "lodash/sortBy";
import withQueueContext from "../../../hoc/queue";

import ArtistImage from "../../../components/ArtistItem/Image"
import Button from "../../../atoms/Button";

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
        <div className="row">
          <div className="col-12 col-md-2">
            <ArtistImage images={artist.images} />
          </div>
          <div className="col-12 col-md-10">
            <h2>{artist.name}</h2>
            <p>{albums.length} álbums disponibles</p>
            <p><Button primary minWidth onClick={replaceQueueAndPlay}>Reproducir {songsCount} temas</Button></p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default withQueueContext(Header);