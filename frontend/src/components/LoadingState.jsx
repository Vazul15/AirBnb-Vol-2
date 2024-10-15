import React from 'react'

export const LoadingButton = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800">
      <div className="flex items-center">
        <svg
          className="w-8 h-8 mr-2 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 12a8 8 0 0116 0M4 12a8 8 0 0016 0M4 12a8 8 0 0116 0"
          />
        </svg>
        <span className="text-white">Loading...</span>
      </div>
    </div>
  )
}

export default LoadingButton;
