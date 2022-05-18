import React from "react";
export function Loading() {
  return (
    <div className="flex flex-col items-center w-full p-4" id="loading">
      <svg
        className="motion-safe:animate-spin"
        width="36"
        height="36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <title>Layer 1</title>
          <ellipse
            fill="#ffffd3"
            stroke="#000"
            cx="18.125"
            cy="8.24999"
            id="svg_1"
            rx="4.87499"
            ry="4.87499"
            strokeWidth="1"
          />
          <ellipse
            transform="rotate(144 25.2502 29.1252)"
            fill="#191919"
            stroke="#000"
            cx="25.25016"
            cy="29.12525"
            id="svg_2"
            rx="4.87499"
            ry="4.87499"
            strokeWidth="1"
          />
          <ellipse
            transform="rotate(72 29.0002 16.1251)"
            fill="#007fff"
            stroke="#000"
            cx="29.00021"
            cy="16.12509"
            id="svg_4"
            rx="4.87499"
            ry="4.87499"
            strokeWidth="1"
          />
          <ellipse
            transform="rotate(-144 11.25 29.1253)"
            fill="#bf0000"
            stroke="#000"
            cx="11.25002"
            cy="29.12525"
            id="svg_5"
            rx="4.87499"
            ry="4.87499"
            strokeWidth="1"
          />
          <ellipse
            transform="rotate(-72 6.74999 16.125)"
            fill="#007f00"
            stroke="#000"
            cx="6.74999"
            cy="16.12499"
            id="svg_6"
            rx="4.87499"
            ry="4.87499"
            strokeWidth="1"
          />
        </g>
      </svg>
      <p>Loading...</p>
    </div>
  );
}
