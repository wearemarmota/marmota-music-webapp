import React, { useState } from "react";
import classNames from "classnames/bind";
import DefaultCover from "./DefaultCover";

export default function Cover(props) {
  const { covers, className, alt, title, size } = props;
  const [loaded, setLoaded] = useState(false);

  if (covers.hasOwnProperty(size)) {
    return <img
      src={covers[size]}
      className={classNames(className, {loaded: loaded})}
      alt={alt}
      width={size}
      height={size}
      onLoad={e => setTimeout(() => setLoaded(true), 1)}
      loading="lazy"
    />;
  }
  
  return <DefaultCover className={className} alt={alt} title={title} />;
}

Cover.defaultProps = {
  size: 500,
}
