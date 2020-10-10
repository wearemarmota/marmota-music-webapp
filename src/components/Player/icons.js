import React from "react";

export function IconPause() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <g fill="none" fillRule="evenodd">
        <circle cx="20" cy="20" r="19" stroke="#CDCDED" strokeWidth="2"/>
        <rect width="3.333" height="15" x="15" y="12.5" fill="#CDCDED" rx="1"/>
        <rect width="3.333" height="15" x="21.667" y="12.5" fill="#CDCDED" rx="1"/>
      </g>
    </svg>
  );
}

export function IconPlay() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <g fill="none" fillRule="evenodd">
        <circle cx="20" cy="20" r="19" stroke="#CDCDED" strokeWidth="2"/>
        <path fill="#CDCDED" d="M23.394 14.289l5.882 11.764c.247.494.047 1.094-.447 1.341-.139.07-.292.106-.447.106H16.618c-.552 0-1-.448-1-1 0-.155.036-.308.106-.447l5.882-11.764c.247-.494.847-.694 1.341-.447.194.096.35.253.447.447z" transform="rotate(90 22.5 20)"/>
      </g>
    </svg>
  );
}

export function IconPrevious() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
      <g stroke="#CDCDED" fill="none">
        <g transform="translate(-662 -1644) rotate(-180 338 829)">
          <path strokeWidth="2" d="M11.764 7L1 1.618v10.764L11.764 7z" />
          <rect width="1" height="13" x="12.944" y=".5" fill="#ADADC8" rx=".5" />
        </g>
      </g>
    </svg>
  );
}

export function IconNext() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
      <g fill="none" fillRule="evenodd">
        <path stroke="#CDCDED" strokeWidth="2" d="M11.764 7L1 1.618v10.764L11.764 7z" />
        <rect width="1.556" height="14" x="12.444" fill="#ADADC8" rx=".778" />
      </g>
    </svg>
  );
}

export function IconQueue() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18">
      <g fill="none" fill-rule="evenodd">
        <g fill="#CDCDED" fill-rule="nonzero">
          <path d="M1315.542 40.29c.29.242.458.604.458.987v2.273l-4.25.868v10.627h-.083c0 1.412-1.4 2.555-3.125 2.555s-3.125-1.143-3.125-2.555c0-1.41 1.4-2.554 3.125-2.554.428 0 .837.07 1.209.198l-.001-10.646c0-.609.42-1.133 1.005-1.252l3.75-.766c.367-.075.748.022 1.037.264zM1301 52.49c.345 0 .625.458.625 1.023 0 .564-.28 1.022-.625 1.022h-4.375c-.345 0-.625-.458-.625-1.022 0-.565.28-1.022.625-1.022H1301zm5-5.108c.345 0 .625.457.625 1.022 0 .564-.28 1.021-.625 1.021h-9.375c-.345 0-.625-.457-.625-1.021 0-.565.28-1.022.625-1.022H1306zm0-5.11c.345 0 .625.458.625 1.023 0 .564-.28 1.021-.625 1.021h-9.375c-.345 0-.625-.457-.625-1.021 0-.565.28-1.022.625-1.022H1306z" transform="translate(-1296 -1632) translate(0 1592)"/>
        </g>
      </g>
    </svg>
  );
}
