import * as React from "react";

function ExpandMore(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 14 8" fill="none" {...props}>
      <path 
        fill="none"
        d="M1.667 1.333L7 6.667l5.333-5.334"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoExpandMore = React.memo(ExpandMore);
export default MemoExpandMore;
