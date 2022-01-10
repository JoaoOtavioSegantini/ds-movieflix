import React from 'react'

function Icon({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={color || '#030517'}
        fillRule="evenodd"
        d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5a2 2 0 01-2-2v-4h2v4h14V5H5v4H3V5a2 2 0 012-2zm6.5 14l-1.41-1.41L12.67 13H3v-2h9.67l-2.58-2.59L11.5 7l5 5-5 5z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default Icon
