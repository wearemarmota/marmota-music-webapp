import React from "react";
import classNames from "classnames/bind";

export default function PhantomCover(props){
  return(
    <svg className={classNames("cover-component loaded", props.className)} width="364" height="364" viewBox="0 0 364 364" xmlns="http://www.w3.org/2000/svg">
      <rect height="364" width="364" y="0" x="0" fill={props.color} />
    </svg>
  );
}

PhantomCover.defaultProps = {
  color: "#081c4e",
}