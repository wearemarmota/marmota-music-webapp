import React from "react";
import classNames from "classnames/bind";

import Duration from "../../../components/Duration";
import Dropdown from "../../../components/Dropdown";

import {
  IconSpeaker,
  IconHeartOutline,
  IconPlay,
  IconMenu
} from "../icons";

import "./index.scss";
import { Link } from "react-router-dom";

export default function List(props) {

  const { album, songs, currentSong, appendSongToQueue, playSong } = props;

  return (
    <table className="songs-list">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Título</th>
          <th className="d-none d-md-table-cell">Artista</th>
          <th className="d-none d-md-table-cell">Duración</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { songs.map((song, index) => {
          return (
            <tr onDoubleClick={e => playSong(index)} key={index} className={classNames({
              playing: currentSong && currentSong.id === song.id
            })}>
              <td className="column-like">
                <button className="unstyled like">
                  <IconHeartOutline />
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
        }) }
      </tbody>
    </table>
  );
}