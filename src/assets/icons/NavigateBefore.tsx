import * as React from "react";

function NavigateBefore(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 8 14" fill="none" {...props}>
      <path
        d="M6.667 1.667L1.333 7l5.334 5.333"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

const MemoNavigateBefore = React.memo(NavigateBefore);
export default MemoNavigateBefore;
