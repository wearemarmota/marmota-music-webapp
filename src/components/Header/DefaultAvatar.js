import React from "react";

export default function DefaultCover(props) {
  const { className, name } = props;
  return (
    <svg className={className} width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect height="100" width="100" y="0" x="0" fill="#d8138a" />
        <circle r="45" cx="50" cy="50" fill="#b1086e" />
        <text fontWeight="bold" textAnchor="middle" fontSize="32" dominantBaseline="central" y="50%" x="50%" fill="white">
          {name}
        </text>
      </g>
    </svg>
  );
}
