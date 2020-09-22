import React, { Component } from "react";
import QueueContext from "../../QueueContext";

import { IconNext, IconPrevious, IconPlay, IconQueue } from "./icons";

import "./index.scss";

class Player extends Component {
  static contextType = QueueContext;

  render() {
    const queue = this.context;
    return (
      <aside id="player">
        {/* {JSON.stringify(queue)} */}
        <div id="song">
          {queue.getCurrentSong() && (
            <>
              <img src="https://www.placehold.it/90x90" className="cover" />
              <div>
                <div className="title">{queue.getCurrentSong().title}</div>
                <div className="artist-and-album">
                  {queue.getCurrentSong().album.title} {" - "}
                  {queue.getCurrentSong().album.artist.name}
                </div>
                <div className="duration-and-proggress">
                  00:00 {" - "}
                  {new Date(queue.getCurrentSong().duration * 1000)
                    .toISOString()
                    .substr(14, 5)}
                </div>
              </div>
            </>
          )}
        </div>

        <div id="controls">
          <button
            className="previous"
            onClick={queue.previous}
            disabled={!queue.hasPreviousSong()}
          >
            <IconPrevious />
          </button>

          <button disabled={!queue.getCurrentSong()}>
            <IconPlay />
          </button>

          <button
            className="next"
            onClick={queue.next}
            disabled={!queue.hasNextSong()}
          >
            <IconNext />
          </button>
        </div>

        <div id="context">
          <button
            className="queue"
            onClick={() => {
              queue.setVisible(!queue.visible);
            }}
          >
            <IconQueue />
          </button>
        </div>
      </aside>
    );
  }
}

export default Player;
