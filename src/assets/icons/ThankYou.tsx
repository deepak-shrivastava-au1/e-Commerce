import * as React from "react";

function ThankYou(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="48px" height="48px" viewBox="0 0 141 112"  {...props}>
      <path
        d="M101.937 45.692L61.063 22.12M122.375 75.667V39.333a9.088 9.088 0 00-4.542-7.857L86.042 13.31a9.084 9.084 0 00-9.084 0L45.167 31.476a9.082 9.082 0 00-4.542 7.858v36.333a9.083 9.083 0 004.542 7.857l31.791 18.167a9.085 9.085 0 009.084 0l31.791-18.167a9.08 9.08 0 004.542-7.857z"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        
      />
      <path
        d="M41.852 34.61L81.5 57.545 121.15 34.61M81.5 103.28V57.5"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx={122} cy={77} r={19} stroke="none"/>
      <path
        d="M132.77 69.662l-13.75 14-6.25-6.364"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.067 11.523l21.456 13.41M17.067 6.523l21.456 13.41M32.067 1.523l21.456 13.41M2.067 30.523l21.456 13.41M2.067 48.523l21.456 13.41"
      />
    </svg>
  );
}

const MemoThankYou = React.memo(ThankYou);
export default MemoThankYou;
