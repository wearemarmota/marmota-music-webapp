import React from "react";

const DefaultCover = props => {
  const { className, title } = props;
  
  return (
    <svg className={className} width="364" height="364" viewBox="0 0 364 364" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect height="364" width="364" y="0" x="0" fill="#FF0182" rx="12" ry="12" />
        <rect height="348" width="348" y="8" x="8" fill="#151f43" rx="8" ry="8" />
        <text fontWeight="bold" textAnchor="middle" fontSize="32" dominantBaseline="middle" y="50%" x="50%" fill="white">
          {title}
        </text>
      </g>
    </svg>
  );
}

export default DefaultCover;