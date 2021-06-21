import classNames from "classnames";

import useImageLoaded from "../../../hooks/useImageLoaded";

import DefaultCover from "./DefaultCover";
import PhantomCover from "./PhantomCover";

import "./index.scss";

const Cover = props => {
  const { covers, className, alt, title, size, preloadedFadeIn = true } = props;

  const [ref, preloaded, loaded, onLoad] = useImageLoaded();

  if (covers.hasOwnProperty(size)) {
    return <img
      ref={ref}
      src={covers[size]}
      className={classNames("cover-component", className, {
        loaded,
        preloaded,
        "preloaded-fade-in": preloadedFadeIn
      })}
      alt={alt}
      width={size}
      height={size}
      onLoad={onLoad}
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