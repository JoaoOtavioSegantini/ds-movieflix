import React from 'react'

function Icon({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      // viewBox="0 0 32 32"
    >
      <g>
        <path
          fill={color || '#000'}
          fillOpacity="0.54"
          fillRule="evenodd"
          d="M19.747 12.16l9.586.827-7.266 6.306 2.173 9.374L16 23.693l-8.24 4.974 2.187-9.374-7.28-6.306 9.586-.814L16 3.333l3.747 8.827zm-8.76 12.067L16 21.2l5.027 3.04-1.334-5.707 4.427-3.84-5.84-.506L16 8.8l-2.267 5.373-5.84.507 4.427 3.84-1.333 5.707z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  )
}

export default Icon
