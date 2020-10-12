import React, { Component } from "react";
import throttle from "lodash/throttle";

import "./index.scss";

class SeekBar extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      isDragging: false,
    }
  }

  startDragging = () => {
    this.setState({ isDragging: true });
  }

  endDragging = (e) => {
    this.setState({ isDragging: false });
  }

  move = (e) => {
    const event = e.nativeEvent;
    if(!this.state.isDragging){
      return;
    }
    this.onClickThrottled(event);
  }

  // onClickThrottled = throttle(this.props.onClick, 200);
  onClickThrottled = throttle((event) => {
    this.props.onClick(event)
  }, 200);

  render(){
    return (
      <div
        className="seekbar"
        onClick={this.props.onClick}
        onMouseUp={this.endDragging}
        onMouseDown={this.startDragging}
        onMouseLeave={this.endDragging}
        onMouseMove={this.move}
      >
        <div className="progress" style={{width: `${this.props.currentPercentage}%`}}>
          <div className="progress-shadow"></div>
        </div>
      </div>
    );
  }
}

export default SeekBar;