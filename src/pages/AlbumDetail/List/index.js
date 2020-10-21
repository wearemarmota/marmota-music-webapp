import React from "react";
import classNames from "classnames/bind";

import Duration from "../../../components/Duration";
import Dropdown, { DropdownButton, DropdownTextDisabled } from "../../../components/Dropdown";

import {
  IconSpeaker,
  IconHeartOutline,
  IconPlay,
  IconMenu
} from "../icons";

import "./index.scss";
import { Link } from "react-router-dom";

export default function List(props) {

  const { album, songs, currentSong, appendSongToQueue } = props;

  return (
    <table className="songs-list">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Título</th>
          <th>Artista</th>
          <th>Duración</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { songs.map((song, index) => {
          return (
            <tr key={index} className={classNames({
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
                <button className="unstyled icon-play"><IconPlay /></button>
              </td>
              <td className="column-title">{song.title}</td>
              <td><Link to={`/artist/${album.artist.id}`}>{album.artist.name}</Link></td>
              <td className="column-duration">
                <Duration seconds={song.duration} />
              </td>
              <td className="column-actions">
                <Dropdown handler={OverflowHandler} offset={{bottom: 90}}>
                  <DropdownButton className="unstyled" onClick={() => appendSongToQueue(song)}>
                    Agregar a la cola
                  </DropdownButton>
                  <DropdownTextDisabled>Descargar</DropdownTextDisabled>
                </Dropdown>
              </td>
            </tr>
          );
        }) }
      </tbody>
    </table>
  );
}

const OverflowHandler = <button className="unstyled">
  <IconMenu />
</button>;