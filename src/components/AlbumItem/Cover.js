import React from "react";
import DefaultCover from "./DefaultCover";

export default function Cover(props) {
  const { covers, className, alt, title, size } = props;

  if (covers.hasOwnProperty(size)) {
    return <img src={covers[size]} className={className} alt={alt} />;
  }

  if (covers.hasOwnProperty(500)) {
    return <img src={covers["500"]} className={className} alt={alt} />;
  }

  return <DefaultCover className={className} alt={alt} title={title} />;
}
