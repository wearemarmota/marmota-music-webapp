import React, { Component } from "react";
import withQueueContext from "../../hoc/queue";
import Logger from "../../shared/logger";

import SeekBar from "./SeekBar";
import CurrentSong from "./CurrentSong";
import Controls from "./Controls";
import Context from "./Context";

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
    this.currentTimeInterval = setInterval(this.timeInterval, 500);
    this.logger = new Logger("Player");

    if ('mediaSession' in navigator) {    
      navigator.mediaSession.setActionHandler('play', this.play);
      navigator.mediaSession.setActionHandler('pause', this.pause);
      navigator.mediaSession.setActionHandler('stop', this.stop);
      navigator.mediaSession.setActionHandler('seekbackward', e => this.setCurrentTime(this.getCurrentTime() - 5));
      navigator.mediaSession.setActionHandler('seekforward', e => this.setCurrentTime(this.getCurrentTime() + 5));
      navigator.mediaSession.setActionHandler('seekto', this.setCurrentTime);
      navigator.mediaSession.setActionHandler('previoustrack', this.previous);
      navigator.mediaSession.setActionHandler('nexttrack', this.next);
    }
  }

  timeInterval = () => {
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

      if(currentPercentage > 99.99){
        // Sometimes the currentPercentage remains in 99.99 periodic
        // so, it nevers increases to 100.
        this.next();
      }
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
    if ('mediaSession' in navigator) {
      this.logger.log(this.props.queueContext.getCurrentSong());
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: this.props.queueContext.getCurrentSong().title,
        artist: this.props.queueContext.getCurrentSong().album.artist.name,
        album: this.props.queueContext.getCurrentSong().album.title,
        artwork: [
          { src: this.props.queueContext.getCurrentSong().album.covers[500],   sizes: '500x500',   type: 'image/jpg' },
        ]
      });
    }
  };

  stop = () => {
    this.audioRef.current.pause();
    this.setCurrentTime(0);
    this.props.queueContext.setPlaying(false);
  }

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
    this.timeInterval();
  };

  setCurrentTime = (currentTime) => {
    if (!this.audioRef.current) {
      this.logger.warn("setCurrentTime", "audio element doesn't exist");
      return;
    }
    if (isNaN(currentTime)) {
      this.logger.warn("setCurrentTime", "currentTime is not a number");
      return;
    }
    this.logger.log("setCurrentTime", currentTime);
    this.audioRef.current.currentTime = currentTime;
    this.timeInterval();
  };

  getCurrentTime = () => {
    return this.audioRef.current.currentTime || null;
  };

  render() {
    const { queueContext } = this.props;
    return (
      <div className="player-wrapper">
        <SeekBar onClick={this.progressBarClick} currentPercentage={this.state.currentPercentage} />
        <aside id="player">

          <audio
            ref={this.audioRef}
            src={queueContext.getCurrentSong() && queueContext.getCurrentSong().fileUri}
          />

          <CurrentSong song={queueContext.getCurrentSong()} seconds={this.state.currentTime} />
          <Controls
            isPlaying={queueContext.playing}
            currentSong={queueContext.getCurrentSong()}
            hasPreviousSong={queueContext.hasPreviousSong()}
            hasNextSong={queueContext.hasNextSong()}
            previous={this.previous}
            next={this.next}
            play={this.play}
            pause={this.pause}
          />
          <Context
            isQueueVisible={queueContext.visible}
            setQueueVisibility={queueContext.setVisible}
          />
        </aside>
      </div>
    );
  }
}

export default withQueueContext(Player);
