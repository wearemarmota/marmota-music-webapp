import { useCallback, useContext } from "react";
import { useSelector } from "react-redux";

import { PlayerContext } from "../../../contexts/player";

import "./index.scss";

const SeekBar = () => {
  const { audio, seekTime } = useContext(PlayerContext);

  const { loadedPortions, currentPercentage } = useSelector(
    (state) => state.queue
  );

  const click = useCallback(
    (e) => {
      if (!audio) return;
      const elementWidth = e.target.getBoundingClientRect().width;
      const clickPositionX = e.pageX;
      const clickPositionPercentage = (clickPositionX * 100) / elementWidth;
      const newTime = (clickPositionPercentage * audio.duration) / 100;
      seekTime(newTime);
    },
    [seekTime]
  );

  return (
    <div className="seekbar" onClick={click}>
      {loadedPortions.map((portion, index) => {
        return (
          <div
            key={index}
            className="portion"
            style={{
              left: `${portion.fromPercentage}%`,
              width: `${portion.toPercentage - portion.fromPercentage}%`,
            }}
          ></div>
        );
      })}
      <div className="progress" style={{ width: `${currentPercentage}%` }}>
        <div className="progress-shadow"></div>
      </div>
    </div>
  );
};

export default SeekBar;
