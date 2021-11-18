import * as React from "react"

function ListConfirm(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
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
        d="M6 1a3 3 0 00-3 3v16a3 3 0 003 3h8.034a6.5 6.5 0 10-2.012-2H6a1 1 0 01-1-1V4a1 1 0 011-1h6.586l6.707 6.707a1 1 0 001.414-1.414l-7-7A1 1 0 0013 1H6zm10.188 20a1 1 0 00.72-.306l4.813-5a1 1 0 00-1.442-1.388l-4.091 4.252-1.467-1.524a1 1 0 00-1.441 1.387l2.187 2.273a1 1 0 00.72.306z"
        stroke="none"
      />
      <path fill="none" strokeWidth={2} d="M20 9v4" />
    </svg>
  )
}

const MemoListConfirm = React.memo(ListConfirm);
export default MemoListConfirm;