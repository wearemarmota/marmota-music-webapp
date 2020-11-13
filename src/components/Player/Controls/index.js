import React from "react";

import Button from "../Button";
import {
  IconNext,
  IconPrevious,
  IconPlay,
  IconPause,
} from "../icons";

import "./index.scss";

export default function Controls(props) {
  
  const {
    isPlaying,
    currentSong,
    hasPreviousSong,
    hasNextSong,
    previous,
    next,
    play,
    pause,
  } = props;
  
  return (
    <div id="controls">
      <Button className="previous" onClick={previous} disabled={!hasPreviousSong} aria-label="Previous">
        <IconPrevious />
      </Button>

      { isPlaying &&
        <Button disabled={!currentSong} onClick={pause} className="pause" aria-label="Pause">
          <IconPause />
        </Button>
      }

      { !isPlaying &&
        <Button disabled={!currentSong} onClick={play} className="play" aria-label="Play">
          <IconPlay />
        </Button>
      }

      <Button className="next" onClick={next} disabled={!hasNextSong} aria-label="Next">
        <IconNext />
      </Button>
    </div>
  );
}