import React from "react";

const ElevatorSVG = ({ status, name }) => {
  return (
    <div>
      <h4 className="text-center">ELEVATOR - {name}</h4>
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="elevator">
          <g id="inside-elevator">
            <path
              id="inside-elevator_2"
              d="M18 20.5H46C46.8284 20.5 47.5 21.1716 47.5 22V58.5H16.5V22C16.5 21.1716 17.1716 20.5 18 20.5Z"
              fill="#7D929B"
              stroke="#3E3546"
            />
            <path
              id="Vector 9"
              d="M20.5 52.5L16.5 58.5H47.5L43.5 52.5H20.5Z"
              fill="#625565"
            />
            <rect
              id="Rectangle 39"
              x="23.5"
              y="23.5"
              width="17"
              height="17"
              rx="1.5"
              fill="#8FD3FF"
              stroke="#3E3546"
            />
            <path
              id="Vector 8"
              d="M29 35L35 29M32 36L36 32M28 32L32 28"
              stroke="#F4EDF5"
              strokeLinecap="round"
            />
            <path
              id="Vector 7"
              d="M16.5 49.5L20.5 43.5H43.5L47.5 49.5"
              stroke="#3E3546"
            />
            <path
              id="Vector 6"
              d="M20.5 52.5L16.5 58.5H47.5L43.5 52.5M20.5 52.5H43.5M20.5 52.5V20.5M43.5 52.5V20.5"
              stroke="#3E3546"
            />
          </g>
          <path
            id="left-door"
            d="M19 20.5H31.5V58.5H16.5V23C16.5 21.6193 17.6193 20.5 19 20.5Z"
            fill="#9BABB2"
            stroke="#3E3546"
            className={`${status === "moving" ? "left-close" : "left-open"}`}
          />
          <path
            id="right-door"
            d="M32.5 20.5H45C46.3807 20.5 47.5 21.6193 47.5 23V58.5H32.5V20.5Z"
            fill="#9BABB2"
            stroke="#3E3546"
            className={`${status === "moving" ? "right-close" : "right-open"}`}
          />
          <path
            id="elevator-bg"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M64 0H0V64H64V0ZM16 11C13.7909 11 12 12.7909 12 15V59H52V15C52 12.7909 50.2091 11 48 11H16Z"
            fill="#F2F7F4"
          />
          <g id="elevator-front">
            <mask id="path-10-inside-1_102_4" fill="white">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 11C13.7909 11 12 12.7909 12 15V59H17V23C17 21.8954 17.8954 21 19 21H45C46.1046 21 47 21.8954 47 23V59H52V15C52 12.7909 50.2091 11 48 11H16Z"
              />
            </mask>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 11C13.7909 11 12 12.7909 12 15V59H17V23C17 21.8954 17.8954 21 19 21H45C46.1046 21 47 21.8954 47 23V59H52V15C52 12.7909 50.2091 11 48 11H16Z"
              fill="#9BABB2"
            />
            <path
              d="M12 59H11V60H12V59ZM17 59V60H18V59H17ZM47 59H46V60H47V59ZM52 59V60H53V59H52ZM13 15C13 13.3431 14.3431 12 16 12V10C13.2386 10 11 12.2386 11 15H13ZM13 59V15H11V59H13ZM17 58H12V60H17V58ZM18 59V23H16V59H18ZM18 23C18 22.4477 18.4477 22 19 22V20C17.3431 20 16 21.3431 16 23H18ZM19 22H45V20H19V22ZM45 22C45.5523 22 46 22.4477 46 23H48C48 21.3431 46.6569 20 45 20V22ZM46 23V59H48V23H46ZM52 58H47V60H52V58ZM51 15V59H53V15H51ZM48 12C49.6569 12 51 13.3431 51 15H53C53 12.2386 50.7614 10 48 10V12ZM16 12H48V10H16V12Z"
              fill="#3E3546"
              mask="url(#path-10-inside-1_102_4)"
            />
          </g>
          <line
            id="floor"
            x1="4.5"
            y1="58.5"
            x2="59.5"
            y2="58.5"
            stroke="#3E3546"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default ElevatorSVG;
