import * as React from "react"

function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 8a1 1 0 00-.707 1.707l6 6a1 1 0 001.414 0l6-6A1 1 0 0018 8H6z"
        stroke="none"
      />
    </svg>
  )
}

const MemoChevronDown = React.memo(ChevronDown);
export default MemoChevronDown;
