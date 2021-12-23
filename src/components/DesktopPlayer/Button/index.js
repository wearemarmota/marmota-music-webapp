import React from "react";
import classNames from "classnames/bind";
import "./index.scss";

export default function Button(props) {

  const { children, className, ...rest } = props;
  
  return (
    <button className={classNames("player-control", className)} {...rest}>
      { children }
    </button>
  );
}