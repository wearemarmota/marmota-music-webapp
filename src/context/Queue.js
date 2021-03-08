import React, { Component } from "react";
import { toast } from "react-toastify";

const QueueContext = React.createContext();

class QueueProvider extends Component {
  state = {
    visible: false,
    songs: [],
    currentIndex: 0,
    playing: false,
  };

  setPlaying = (playing) => {
    return new Promise((resolve) => {
      this.setState(
        () => {
          return { playing: playing };
        },
        () => {
          resolve();
        }
      );
    });
  };

  setVisible = (visible) => {
    return new Promise((resolve, reject) => {
      this.setState(
        () => {
          return { visible: visible };
        },
        () => {
          resolve();
        }
      );
    });
  };

  setSongs = (songs) => {
    return new Promise((resolve, reject) => {
      this.setState({
        songs: songs,
      }, () => {
        toast(`Cola de reproducción actualizada con ${songs.length} canciones`);
        resolve();
      });
    })
  };

  setCurrentIndex = (index) => {
    return this.moveTo(index);
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
    return this.movePositions(+1);
  };

  previous = () => {
    return this.movePositions(-1);
  };

  moveTo = (position) => {
    return new Promise((resolve, reject) => {

      if(!Number.isInteger(position)){
        reject("Invalid position value");
        return;
      }
      
      const { songs } = this.state;
      const positionExists = typeof songs[parseInt(position)] !== "undefined";
  
      if (!positionExists) {
        reject("Invalid movement");
        return;
      }
      
      this.setState({
        currentIndex: parseInt(position),
      }, () => {
        resolve();
      });
    });
  }

  movePositions = (amount) => {
    return new Promise((resolve, reject) => {

      if(!Number.isInteger(amount)){
        reject("Invalid amount value");
        return;
      }

      const { currentIndex } = this.state;
      
      this.moveTo(currentIndex + parseInt(amount)).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      })
    });
  }
  
  render() {
    const { playing, visible, songs, currentIndex } = this.state;
    const { children } = this.props;
    const currentSong = this.getCurrentSong();

    const {
      setPlaying,
      setVisible,
      setSongs,
      setCurrentIndex,
      hasNextSong,
      hasPreviousSong,
      next,
      previous,
    } = this;

    return (
      <QueueContext.Provider
        value={{
          playing,
          visible,
          songs,
          currentIndex,
          setPlaying,
          setVisible,
          setSongs,
          setCurrentIndex,
          currentSong,
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
