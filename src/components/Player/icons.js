import React from "react";

export function IconPause() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <circle
        cx="24"
        cy="24"
        r="23"
        stroke="#CDCDED"
        strokeWidth="2"
        fill="none"
      />
      <rect width="4" height="18" x="18" y="15" fill="#CDCDED" rx="1" />
      <rect width="4" height="18" x="26" y="15" fill="#CDCDED" rx="1" />
    </svg>
  );
}

export function IconPlay() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <circle
        cx="24"
        cy="24"
        r="23"
        stroke="#CDCDED"
        strokeWidth="2"
        fill="none"
      />
      <path
        fill="#CDCDED"
        d="M27.894 16.789l7.382 14.764c.247.494.047 1.094-.447 1.341-.139.07-.292.106-.447.106H19.618c-.552 0-1-.448-1-1 0-.155.036-.308.106-.447l7.382-14.764c.247-.494.847-.694 1.341-.447.194.096.35.253.447.447z"
        transform="rotate(90 27 24)"
      />
    </svg>
  );
}

export function IconPrevious() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
    >
      <g stroke="#CDCDED" fill="none">
        <g transform="translate(-662 -1644) rotate(-180 338 829)">
          <path stroke-width="2" d="M11.764 7L1 1.618v10.764L11.764 7z" />
          <rect
            width="1"
            height="13"
            x="12.944"
            y=".5"
            fill="#ADADC8"
            rx=".5"
          />
        </g>
      </g>
    </svg>
  );
}

export function IconNext() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
    >
      <g fill="none" fill-rule="evenodd">
        <g>
          <g transform="translate(-764 -1644) translate(764 1644)">
            <path
              stroke="#CDCDED"
              stroke-width="2"
              d="M11.764 7L1 1.618v10.764L11.764 7z"
            />
            <rect
              width="1.556"
              height="14"
              x="12.444"
              fill="#ADADC8"
              rx=".778"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export function IconQueue() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="22"
      viewBox="0 0 25 22"
    >
      <g fill="none" fill-rule="evenodd">
        <g fill="#CDCDED" fill-rule="nonzero">
          <path
            d="M1320.428 1640.354c.362.296.572.74.572 1.208v2.78l-5.313 1.063v13h-.104c0 1.727-1.75 3.125-3.906 3.125s-3.906-1.398-3.906-3.125c0-1.726 1.75-3.125 3.906-3.125.536 0 1.046.087 1.511.243v-13.024c0-.744.526-1.385 1.256-1.531l4.687-.938c.46-.091.935.027 1.297.324zm-18.178 14.926c.431 0 .781.56.781 1.25s-.35 1.25-.781 1.25h-5.469c-.431 0-.781-.56-.781-1.25s.35-1.25.781-1.25h5.469zm6.25-6.25c.431 0 .781.56.781 1.25s-.35 1.25-.781 1.25h-11.719c-.431 0-.781-.56-.781-1.25s.35-1.25.781-1.25h11.719zm0-6.25c.431 0 .781.56.781 1.25s-.35 1.25-.781 1.25h-11.719c-.431 0-.781-.56-.781-1.25s.35-1.25.781-1.25h11.719z"
            transform="translate(-1296 -1640)"
          />
        </g>
      </g>
    </svg>
  );
}
