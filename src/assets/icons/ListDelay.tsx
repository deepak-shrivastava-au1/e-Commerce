import * as React from "react"

function ListDelay(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13 2v7h7"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 1a3 3 0 00-3 3v16a3 3 0 003 3h8.034a6.5 6.5 0 10-2.012-2H6a1 1 0 01-1-1V4a1 1 0 011-1h6.586l6.707 6.707a1 1 0 001.414-1.414l-7-7A1 1 0 0013 1H6zm9.5 20a1 1 0 001-1v-5a1 1 0 10-2 0v5a1 1 0 001 1zm4-7a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1z"
        stroke="none"
      />
    </svg>
  )
}

const MemoListDelay = React.memo(ListDelay);
export default MemoListDelay;