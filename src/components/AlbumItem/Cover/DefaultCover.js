import React from "react";

export default function DefaultCover(props) {
  const { className, title } = props;
  return (
    <svg className={className} width="364" height="364" viewBox="0 0 364 364" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect height="364" width="364" y="0" x="0" fill="#d8138a" />
        <rect height="300" width="300" y="32" x="32" fill="#b1086e" />
        <text fontWeight="bold" textAnchor="middle" fontSize="32" dominantBaseline="middle" y="50%" x="50%" fill="white">
          {title}
        </text>
      </g>
    </svg>
  );
}
