import React from "react";

import "./index.scss";

export default function Header(props) {
  return (
    <header className="queue-header">
      <h2>{props.title}</h2>
      { props.closeAction &&
        <button className="unstyled" onClick={props.closeAction}>
          <IconClose />
        </button>
      }
    </header>
  );
}

function IconClose(props) {
  return (
    <svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>
  );
}