import * as React from "react";

function Add(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        clipPath="url(#prefix__clip0)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 12H6M12 6v12" />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path
            transform="rotate(45 6 14.485)"
            d="M0 0h16.971v16.971H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

const MemoAdd = React.memo(Add);
export default MemoAdd;
