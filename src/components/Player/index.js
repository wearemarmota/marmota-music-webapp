import React, { Component } from "react";
import withQueueContext from "../../hoc/queue";

import {
  IconNext,
  IconPrevious,
  IconPlay,
  IconPause,
  IconQueue,
} from "./icons";
import Cover from "../Album/Cover";

import "./index.scss";

class Player extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      currentTime: 0,
      currentPercentage: 0,
    };
    this.currentTimeInterval = null;
  }

  componentDidMount() {
    this.currentTimeInterval = setInterval(() => {
      if (!this.audioRef.current) {
        return;
      }

      const oldCurrentTime = this.state.currentTime;
      const newCurrentTime = this.audioRef.current.currentTime;
      const audioDuration = this.audioRef.current.duration;
      const currentPercentage = (newCurrentTime * 100) / audioDuration;

      if (oldCurrentTime !== newCurrentTime) {
        this.setState({
          currentTime: newCurrentTime,
          currentPercentage: currentPercentage,
        });
        if(currentPercentage === 100){
          this.next();
        }
      }
    }, 500);

    if ("mediaSession" in navigator) {
      window.navigator.mediaSession.setActionHandler("play", () => {
        this.play();
      });
      window.navigator.mediaSession.setActionHandler("pause", () => {
        this.pause();
      });
      window.navigator.mediaSession.setActionHandler(
        "seekbackward",
        (details) => {
          console.log("seekbackward", details);
          if (this.getCurrentTime() > 10) {
            this.setCurrentTime(this.getCurrentTime() - 10);
          }
        }
      );
      window.navigator.mediaSession.setActionHandler(
        "seekforward",
        (details) => {
          console.log("seekforward", details);
          this.setCurrentTime(this.getCurrentTime() + 10);
          // if ((player.currentTime+10) < player.duration) {
          //     player.currentTime = player.currentTime + 10;
          // }
        }
      );
      //     navigator.mediaSession.setActionHandler('previoustrack', function (details) {
      //         console.log('previoustrack', details, songInfo.startPrevious);
      //         if (songInfo.startPrevious) {
      //             player.currentTime = songInfo.startPrevious;
      //         }
      //     });
      //     navigator.mediaSession.setActionHandler('nexttrack', function (details) {
      //         console.log('nexttrack', details, songInfo.duration);
      //         player.currentTime = songInfo.start + songInfo.duration;
      //     });
      //     try {
      //         navigator.mediaSession.setActionHandler('skipad', function() {
      //             console.log('skipad', details);
      //         });
      //     } catch(error) {
      //         // console.log(error);
      //     }
      //     try {
      //         navigator.mediaSession.setActionHandler('stop', function (details) {
      //             console.log('stop', details);
      //             player.stop();
      //             resetMediaSession();

      //         });
      //     } catch(error) {
      //         // console.log(error);
      //     }
      // try {
      window.navigator.mediaSession.setActionHandler("seekto", function (
        details
      ) {
        console.log(details);
      });
      // } catch(error) {
      //     console.log(error);
      // }
    }
  }

  componentWillUnmount() {
    clearInterval(this.currentTimeInterval);
  }

  componentDidUpdate(prevProps) {
    if (this.props.queueContext.playing !== prevProps.queueContext.playing) {
      if (this.props.queueContext.playing) {
        this.play();
      } else {
        this.pause();
      }
    }
  }

  play = () => {
    this.audioRef.current.play();
    this.props.queueContext.setPlaying(true);

    // More info about mediaSession
    // https://ottball.github.io/media-session-api/sample-1.html
    // and
    // https://googlechrome.github.io/samples/media-session/audio.html
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: this.props.queueContext.getCurrentSong().title,
        artist: this.props.queueContext.getCurrentSong().album.artist.name,
        album: this.props.queueContext.getCurrentSong().album.title,
        artwork: [
          {
            src: `https://picsum.photos/seed/${
              this.props.queueContext.getCurrentSong().album.id
            }/256/256`,
            sizes: "256x256",
            type: "image/png",
          },
        ],
      });
    }
  };

  pause = () => {
    this.audioRef.current.pause();
    this.props.queueContext.setPlaying(false);
  };

  next = () => {
    this.props.queueContext.next().then(() => {
      this.play();
    }).catch(() => {
      this.pause();
    });
  };

  previous = () => {
    this.props.queueContext.previous().then(() => {
      this.play();
    });
  };

  progressBarClick = (e) => {
    if(!this.audioRef.current){
      return;
    }
    const elementWidth = e.target.getBoundingClientRect().width;
    const clickPositionX = e.pageX;
    const clickPositionPercentage = clickPositionX * 100 / elementWidth;
    const audioElement = this.audioRef.current;
    const newCurrentTime = clickPositionPercentage * audioElement.duration / 100;
    this.setCurrentTime(newCurrentTime);
  };

  setCurrentTime = (currentTime) => {
    if (!this.audioRef.current) {
      return;
    }
    this.audioRef.current.currentTime = currentTime;
  };

  getCurrentTime = () => {
    return this.audioRef.current.currentTime || null;
  };

  render() {
    const { queueContext } = this.props;
    return (
      <div className="player-wrapper">
        <div className="progress-bar" onClick={this.progressBarClick}>
          <div className="progress" style={{width: `${this.state.currentPercentage}%`}}>
            <div className="progress-shadow"></div>
          </div>
        </div>
        <aside id="player">
          {queueContext.getCurrentSong() && (
            <audio
              ref={this.audioRef}
              src={queueContext.getCurrentSong().fileUri}
            />
          )}

          <div id="song">
            {queueContext.getCurrentSong() && (
              <>
                <Cover
                  title={queueContext.getCurrentSong().album.title}
                  covers={queueContext.getCurrentSong().album.covers}
                  className="cover"
                  size="100"
                />
                <div className="song-data">
                  <div className="title">
                    {queueContext.getCurrentSong().title}
                  </div>
                  <div className="artist-and-album">
                    {queueContext.getCurrentSong().album.title} {" - "}
                    {queueContext.getCurrentSong().album.artist.name}
                  </div>
                  <div className="duration-and-proggress">
                    <CurrentTime time={this.state.currentTime} /> {" - "}
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

            <button
              disabled={!queueContext.getCurrentSong()}
              onClick={queueContext.playing ? this.pause : this.play}
            >
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
      </div>
    );
  }
}

function CurrentTime(props){
  const { time } = props;
  let remaining = time;
  const hours = Math.floor(time/3600);
  remaining = remaining-hours*3600;
  const minutes = Math.floor(remaining/60);
  remaining = remaining-minutes*60;
  const seconds = Math.floor(remaining);

  const formattedHours = ("0" + hours).slice(-2);
  const formattedMinutes = ("0" + minutes).slice(-2);
  const formattedSeconds = ("0" + seconds).slice(-2);
  return(
    <>
      {formattedHours !== "00" && formattedHours + ":"}
      {formattedMinutes}:
      {formattedSeconds}
    </>
  );
}

export default withQueueContext(Player);
