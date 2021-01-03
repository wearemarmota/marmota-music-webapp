import React, { useState } from "react";
import classNames from "classnames/bind";

import "./index.scss";

const Image = props => {
  const { name, images, className, alt, size } = props;
  const [loaded, setLoaded] = useState(false);

  if (images.hasOwnProperty(size)) {
    return <img
      src={images[size]}
      className={classNames("artist-image", className, {loaded: loaded})}
      alt={alt}
      width={size}
      height={size}
      // Using this "fake" timeout to always ensure a change
      // with the "loaded" class.
      onLoad={e => setTimeout(() => setLoaded(true), 1)}
      loading="lazy"
    />;
  }
  
  return <DefaultImage name={name} className={classNames("artist-image", className)} alt={name} />;
}

const DefaultImage = props => {
  const { className, name } = props;
  return (
    <svg className={className} width="364" height="364" viewBox="0 0 364 364" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect height="364" width="364" y="0" x="0" fill="#ff0182" />
        <circle r="175" cx="182" cy="182" fill="#000d2e"/>
        <text fontWeight="bold" textAnchor="middle" fontSize="32" dominantBaseline="middle" y="50%" x="50%" fill="white">
          {name}
        </text>
      </g>
    </svg>
  );
}

Image.defaultProps = {
  size: 500,
}

export default Image;
