import * as React from "react"

function LeftArrowCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.375 12.5a9.625 9.625 0 1019.25 0 9.625 9.625 0 00-19.25 0zM23 12.5a11 11 0 11-22 0 11 11 0 0122 0zm-6.188-.688a.687.687 0 110 1.376H8.848l2.952 2.95a.687.687 0 11-.973.974L6.7 12.987a.687.687 0 010-.974l4.125-4.125a.688.688 0 11.973.974l-2.952 2.95h7.966z"
          stroke="none"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path  stroke="none" transform="translate(1 1.5)" d="M0 0h22v22H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}


const MemoLeftArrowCircle = React.memo(LeftArrowCircle);
export default MemoLeftArrowCircle;
