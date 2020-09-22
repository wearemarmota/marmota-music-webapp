import React, { Component } from "react";

const QueueContext = React.createContext();

class QueueProvider extends Component {
  state = {
    visible: false,
    songs: [],
    currentIndex: 0,
  };

  setVisible = (visible) => {
    this.setState({
      visible: visible,
    });
  };

  setSongs = (songs) => {
    this.setState({
      songs: songs,
    });
  };

  setCurrentIndex = (index) => {
    if (index > this.state.songs.length) {
      console.error("setCurrentIndex with invalid value", {
        index: index,
        queueLength: this.state.songs.length,
      });
      return;
    }
    this.setState({
      currentIndex: 0,
    });
  };

  getCurrentSong = () => {
    const { songs, currentIndex } = this.state;
    return songs[currentIndex] || null;
  };

  hasPreviousSong = () => {
    const { songs, currentIndex } = this.state;
    return typeof songs[currentIndex - 1] !== "undefined";
  };

  hasNextSong = () => {
    const { songs, currentIndex } = this.state;
    return typeof songs[currentIndex + 1] !== "undefined";
  };

  next = () => {
    if (!this.hasNextSong()) {
      console.error("Invalid next() call");
      return;
    }
    this.setState((prevState) => {
      return { currentIndex: prevState.currentIndex + 1 };
    });
  };

  previous = () => {
    if (!this.hasPreviousSong()) {
      console.error("Invalid previous() call");
      return;
    }
    this.setState((prevState) => {
      return { currentIndex: prevState.currentIndex - 1 };
    });
  };

  render() {
    const { visible, songs, currentIndex } = this.state;
    const { children } = this.props;
    const {
      setVisible,
      setSongs,
      getCurrentSong,
      hasNextSong,
      hasPreviousSong,
      next,
      previous,
    } = this;

    return (
      <QueueContext.Provider
        value={{
          visible,
          songs,
          currentIndex,
          setVisible,
          setSongs,
          getCurrentSong,
          hasNextSong,
          hasPreviousSong,
          next,
          previous,
        }}
      >
        {children}
      </QueueContext.Provider>
    );
  }
}

export default QueueContext;
export { QueueProvider };
