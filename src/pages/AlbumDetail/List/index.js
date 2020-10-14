import React from "react";
import classNames from "classnames/bind";

import Duration from "../../../components/Duration";

import {
  IconSpeaker,
  IconHeartOutline,
  IconPlay,
  IconMenu
} from "../icons";

import "./index.scss";

export default function List(props) {

  const { album, songs, currentSong } = props;

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
            <tr key={index} className={classNames({playing: currentSong && currentSong.id === song.id})}>
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
              <td>{album.artist.name}</td>
              <td>
                <Duration seconds={song.duration} />
              </td>
              <td className="column-actions">
                <button className="unstyled" onClick={() => { this.appendSongToQueue(song); }}>
                  <IconMenu />
                </button>
              </td>
            </tr>
          );
        }) }
      </tbody>
    </table>
  );
}