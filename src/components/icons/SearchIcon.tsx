// src/components/icons/SearchIcon.tsx
import React from 'react'

// Você pode receber props (como className) para estilizar dinamicamente
interface Props extends React.SVGProps<SVGSVGElement> {}

const SearchIcon: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

export default SearchIcon
