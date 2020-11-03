import React from "react";

const Phantom = props => {

  const { showTitle, showArtist } = props;

  return <article className="album phantom">
    <div className="cover">
      <svg className="cover-component" width="364" height="364" viewBox="0 0 364 364" xmlns="http://www.w3.org/2000/svg">
        <rect height="364" width="364" y="0" x="0" fill="#081c4e" />
      </svg>
    </div>
    { showTitle && (
      <h1 className="title">
        █████████
      </h1>
    )}
    { showArtist && (
      <div className="artist">
        ▆▆▆▆
      </div>
    )}
  </article>
}

Phantom.defaultProps = {
  showTitle: true,
  showArtist: true,
}

export default Phantom;