import { useState, useCallback } from "react";
import throttle from "lodash/throttle";

import "./index.scss";

const SeekBar = ({ loadedPortions, onClick, currentPercentage }) => {

  const [isDragging, setIsDragging] = useState(false);

  const move = e => {
    if(!isDragging) return;
    onClickThrottled(e.nativeEvent);
  }

  const onClickThrottled = useCallback(throttle(event => onClick(event), 5000), []);

  return(
    <div
      className="seekbar"
      onClick={onClick}
      onMouseUp={() => setIsDragging(false)}
      onMouseDown={() => setIsDragging(true)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={move}
    >
      {
        loadedPortions.map((portion, index) => {
          return <div key={index} className="portion" style={{left: `${portion.fromPercentage}%`, width: `${portion.toPercentage - portion.fromPercentage}%`}}></div>
        })
      }
      <div className="progress" style={{width: `${currentPercentage}%`}}>
        <div className="progress-shadow"></div>
      </div>
    </div>
  );
}

export default SeekBar;