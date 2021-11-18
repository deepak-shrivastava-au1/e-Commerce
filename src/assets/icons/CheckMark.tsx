import * as React from "react";

function CheckMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 17 17"  fill="none" {...props}>
      <g
        clipPath="url(#prefix__clip0)"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.025 7.566v.629a6.83 6.83 0 11-4.05-6.242" fill="none"/>
        <path d="M15.024 2.732L8.195 9.568 6.146 7.519" fill="none"/>
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill="#fff" d="M0 0h16.39v16.39H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

const MemoCheckMark = React.memo(CheckMark);
export default MemoCheckMark;
