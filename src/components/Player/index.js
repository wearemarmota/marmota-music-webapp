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
      loadedPortions: [],
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
      navigator.mediaSession.setActionHandler('seekto', e => this.setCurrentTime(e.seekTime || 0));
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

      if(this.audioRef.current.ended){
        this.next();
      }
    }

    let loadedPortions = [];
    for( let i = 0; i < this.audioRef.current.buffered.length; i++ ){
      let fromSecond = this.audioRef.current.buffered.start(i);
      let toSecond = this.audioRef.current.buffered.end(i);
      let fromPercentage = (fromSecond * 100) / audioDuration;
      let toPercentage = (toSecond * 100) / audioDuration;
      let portion = { fromSecond, toSecond, fromPercentage, toPercentage };
      loadedPortions.push(portion);
      this.setState({ loadedPortions: loadedPortions });
    }

  }

  componentWillUnmount() {
    clearInterval(this.currentTimeInterval);
  }

  componentDidUpdate(prevProps) {

    const { queueContext: prevQueueContext } = prevProps;
    const { queueContext } = this.props;

    if (queueContext.playing !== prevQueueContext.playing) {
      if (queueContext.playing) {
        this.play();
      } else {
        this.pause();
      }
    }

    if (queueContext.currentSong !== prevQueueContext.currentSong){
      if(queueContext.currentSong === null){
        this.setCurrentTime(0);
      }
    }
  }

  play = () => {
    this.audioRef.current.play().then(() => {
      
      this.props.queueContext.setPlaying(true);
      if ('mediaSession' in navigator) {
  
        const { currentSong } = this.props.queueContext;
  
        let metadata = {
          title: currentSong.title,
          artist: currentSong.album.artist.name,
          album: currentSong.album.title,
          artwork: Object.keys(currentSong.album.covers).map(size => {
            if(["100","500"].includes(size)) return {
              src: currentSong.album.covers[size],
              sizes: `${size}x${size}`,
              type: 'image/webp',
            }
          }).filter(i => i),
        };
  
        navigator.mediaSession.metadata = new window.MediaMetadata(metadata);
      }

    });

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
        <SeekBar
          onClick={this.progressBarClick}
          currentPercentage={this.state.currentPercentage}
          loadedPortions={this.state.loadedPortions}
        />
        <aside id="player">

          <audio
            ref={this.audioRef}
            src={queueContext.currentSong && queueContext.currentSong.source}
          />

          <CurrentSong song={queueContext.currentSong} seconds={this.state.currentTime} />
          <Controls
            isPlaying={queueContext.playing}
            currentSong={queueContext.currentSong}
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
