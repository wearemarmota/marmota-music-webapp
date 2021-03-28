import { useContext } from "react";
import { Link } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";

import useFavorite from "../../hooks/useFavorite";
import QueueContext from "../../context/Queue";

import Cover from "../AlbumItem/Cover";
import Duration from "../Duration";
import Dropdown from "../Dropdown";

import {
  IconSpeaker,
  IconHeartOutline,
  IconPlay,
  IconMenu,
  IconHeartFilled
} from "./icons";

import "./index.scss";

const SongsList = ({ songs, showCovers }) => {

  const queue = useContext(QueueContext);

  const replaceQueueAndPlay = (index = 0) => {
    queue.setSongs(cloneDeep(songs)).then(() => {
      queue.setCurrentIndex(index).then(() => {
        queue.setPlaying(false).then(queue.setPlaying(true));
      });
    });
  };

  return(
    <section className="songs-list">
      <ListHeader />
      <main>
        { songs.map((song, index) => <ListRow
          key={song.id}
          index={index}
          song={song}
          showCover={showCovers}
          replaceQueueAndPlay={replaceQueueAndPlay}
        />) }
      </main>
    </section>
  );
}

const ListHeader = () => {
  return(
    <header>
      <div className="like"></div>
      <div className="position"></div>
      <div className="title">Title</div>
      <div className="artist">Artist</div>
      <div className="album">Album</div>
      <div className="duration">Duration</div>
      <div className="actions"></div>
    </header>
  );
}

const ListRow = ({ index, song, showCover, replaceQueueAndPlay }) => {

  const {
    isUpdatingFavorite,
    isFavorited,
    toggleFavorite,
  } = useFavorite(song.id, song.isFavorited);

  const queue = useContext(QueueContext);

  const addToQueue = () => queue.setSongs([].concat(queue.songs, [song]));

  const playingAnything = queue.currentSong !== null;
  const playingThis = (playingAnything && queue.currentSong.uuid) === song.uuid;

  return(
    <article playing={playingThis.toString()}>
      <div className="like">
        <button className="unstyled" disabled={isUpdatingFavorite} onClick={toggleFavorite}>
          { isFavorited ? <IconHeartFilled /> : <IconHeartOutline /> }
        </button>
      </div>
      <div className="position">
        {
          showCover ?
          <Cover covers={song.album.covers} title={song.album.title} />:
          <span className="number">{ song.position }</span>
        }
        <div className="icon-speaker"><IconSpeaker /></div>
        <button className="unstyled icon-play" onClick={ e => replaceQueueAndPlay(index) }><IconPlay /></button>
      </div>
      <div className="title">{ song.title }</div>
      <div className="artist"><Link to={`/artist/${song.album.artist.id}`}>{song.album.artist.name}</Link></div>
      <div className="album"><Link to={`/album/${song.album.id}`}>{song.album.title}</Link></div>
      <div className="duration"><Duration seconds={song.duration} /></div>
      <div className="actions">
      <Dropdown>
          <Dropdown.Handler>
            <button className="unstyled dropdown-handler">
              <IconMenu />
            </button>
          </Dropdown.Handler>
          <Dropdown.List offset={{bottom: 90}}>
            <Dropdown.Item hideOnClick>
              <button className="unstyled" onClick={addToQueue}>Agregar a la cola</button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </div>
    </article>
  );
}

export default SongsList;