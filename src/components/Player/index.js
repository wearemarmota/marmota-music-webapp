import React, { Component } from "react";
import withQueueContext from "../../hoc/queue";

import {
  IconNext,
  IconPrevious,
  IconPlay,
  IconPause,
  IconQueue,
} from "./icons";

import "./index.scss";

class Player extends Component {

  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }

  componentDidUpdate(prevProps){
    if (this.props.queueContext.playing !== prevProps.queueContext.playing) {
      if(this.props.queueContext.playing){
        this.play();
      }else{
        this.pause();
      }
    }
  
  }

  play = () => {
    this.audioRef.current.play();
    this.props.queueContext.setPlaying(true);
  };

  pause = () => {
    this.audioRef.current.pause();
    this.props.queueContext.setPlaying(false);
  };

  next = () => {
    this.props.queueContext.next().then(() => {
      this.play();
    });
  }

  previous = () => {
    this.props.queueContext.previous().then(() => {
      this.play();
    });
  }

  render() {
    const { queueContext } = this.props;
    return (
      <aside id="player">
        { queueContext.getCurrentSong() &&
          <audio ref={this.audioRef} src={queueContext.getCurrentSong().fileUri} />
        }

        <div id="song">
          {queueContext.getCurrentSong() && (
            <>
              <img src="https://www.placehold.it/90x90" className="cover" />
              <div>
                <div className="title">{queueContext.getCurrentSong().title}</div>
                <div className="artist-and-album">
                  {queueContext.getCurrentSong().album.title} {" - "}
                  {queueContext.getCurrentSong().album.artist.name}
                </div>
                <div className="duration-and-proggress">
                  00:00 {" - "}
                  {new Date(queueContext.getCurrentSong().duration * 1000)
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
            onClick={this.previous}
            disabled={!queueContext.hasPreviousSong()}
          >
            <IconPrevious />
          </button>

          <button disabled={!queueContext.getCurrentSong()} onClick={ queueContext.playing ? this.pause : this.play }>
            {queueContext.playing ? <IconPause /> : <IconPlay />}
          </button>

          <button
            className="next"
            onClick={this.next}
            disabled={!queueContext.hasNextSong()}
          >
            <IconNext />
          </button>
        </div>

        <div id="context">
          <button
            className="queue"
            onClick={() => {
              queueContext.setVisible(!queueContext.visible);
            }}
          >
            <IconQueue />
          </button>
        </div>
      </aside>
    );
  }
}

export default withQueueContext(Player);
