import React, { useState } from "react";
import classNames from "classnames";
import DefaultCover from "./DefaultCover";
import PhantomCover from "./PhantomCover";
import "./index.scss";

const Cover = props => {
  const { covers, className, alt, title, size } = props;
  const [loaded, setLoaded] = useState(false);

  if (covers.hasOwnProperty(size)) {
    return <img
      src={covers[size]}
      className={classNames("cover-component", className, {loaded: loaded})}
      alt={alt}
      width={size}
      height={size}
      onLoad={e => setLoaded(true)}
      loading="lazy"
    />;
  }
  
  return <DefaultCover className={classNames("cover-component loaded", className)} alt={alt} title={title} />;
}

Cover.defaultProps = {
  size: 500,
}

Cover.Default = DefaultCover;
Cover.Phantom = PhantomCover;
export default Cover;