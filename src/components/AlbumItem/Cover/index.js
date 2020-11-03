import React, { useState } from "react";
import classNames from "classnames/bind";
import DefaultCover from "./DefaultCover";
import PhantomCover from "./PhantomCover";

import "./index.scss";

function Cover(props) {
  const { covers, className, alt, title, size } = props;
  const [loaded, setLoaded] = useState(false);

  if (covers.hasOwnProperty(size)) {
    return <img
      src={covers[size]}
      className={classNames("cover-component", className, {loaded: loaded})}
      alt={alt}
      width={`${size}px`}
      height={`${size}px`}
      // Using this "fake" timeout to always ensure a change
      // with the "loaded" class.
      onLoad={e => setTimeout(() => setLoaded(true), 1)}
      loading="lazy"
    />;
  }
  
  return <DefaultCover className={classNames("cover-component", className)} alt={alt} title={title} />;
}

Cover.defaultProps = {
  size: 500,
}

Cover.Default = DefaultCover;
Cover.Phantom = PhantomCover;
export default Cover;